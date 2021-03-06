const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('config');
const models = require('../../db/models');

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => (
  models.Profile.where({ id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      done(null, profile.serialize());
    })
    .error((error) => {
      done(error, null);
    })
    .catch(() => {
      done(null, null, { message: 'No user found' });
    })
));

const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
  return models.Auth.where({ type, oauth_id: oauthProfile.id }).fetch({
    withRelated: ['profile']
  })
    .then((oauthAccount) => {
      if (oauthAccount) {
        throw oauthAccount;
      }

      if (!oauthProfile.emails || !oauthProfile.emails.length) {
        // FB users can register with a phone number, which is not exposed by Passport
        throw null;
      }
      return models.Profile.where({ email: oauthProfile.emails[0].value }).fetch();
    })
    .then(profile => {
      const profileInfo = {
        first: type !== 'twitter' ? oauthProfile.name.givenName : '',
        last: type !== 'twitter' ? oauthProfile.name.familyName: '',
        display: oauthProfile.displayName || `${oauthProfile.name.givenName} ${oauthProfile.name.familyName}`,
        email: oauthProfile.emails[0].value
      };

      if (profile) {
        // update profile with info from oauth
        return profile.save(profileInfo, { method: 'update' });
      }

      // otherwise create new profile
      return models.Profile.forge(profileInfo).save();
    })
    .tap((profile) => {
      return models.Auth.forge({
        type,
        profile_id: profile.get('id'),
        oauth_id: oauthProfile.id
      }).save();
    })
    .error((err) => {
      done(err, null);
    })
    .catch((oauthAccount) => {
      if (!oauthAccount) {
        throw oauthAccount;
      }
      return oauthAccount.related('profile');
    })
    .then((profile) => {
      if (profile) {
        done(null, profile.serialize());
      }
    })
    .catch(() => {
      // TODO: This is not working because redirect to login uses req.flash('loginMessage')
      // and there is no access to req here
      done(null, null, {
        message: `Signing up requires an email address, 
          please be sure there is an email address associated with your Facebook account \
          and grant access when you register.` });
    });
};

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
  (req, email, password, done) => {
    // check to see if there is a local account with this email address
    return models.Profile.where({ email }).fetch({
      withRelated: [{
        auths: query => query.where({ type: 'local' })
      }]
    })
      .then((profile) => {
        // create a new profile if a profile does not exist
        if (!profile) {
          return models.Profile.forge({ email }).save();
        }
        // throw if local auth account already exists
        if (profile.related('auths').at(0)) {
          throw profile;
        }

        return profile;
      })
      .tap((profile) => {
        // create a new local auth account with the user's profile id
        return models.Auth.forge({
          password,
          type: 'local',
          profile_id: profile.get('id')
        }).save();
      })
      .then((profile) => {
        // serialize profile for session
        done(null, profile.serialize());
      })
      .error((error) => {
        done(error, null);
      })
      .catch(() => {
        done(null, false, req.flash('signupMessage', 'An account with this email address already exists.'));
      });
  }));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
  (req, email, password, done) => {
    // fetch any profiles that have a local auth account with this email address
    return models.Profile.where({ email }).fetch({
      withRelated: [{
        auths: query => query.where({ type: 'local' })
      }]
    })
      .then((profile) => {
        // if there is no profile with that email or if there is no local auth account with profile
        if (!profile || !profile.related('auths').at(0)) {
          throw profile;
        }

        // check password and pass through account
        return Promise.all([profile, profile.related('auths').at(0).comparePassword(password)]);
      })
      .then(([profile, match]) => {
        if (!match) {
          throw profile;
        }
        // if the password matches, pass on the profile
        return profile;
      })
      .then((profile) => {
        // call done with serialized profile to include in session
        done(null, profile.serialize());
      })
      .error((err) => {
        done(err, null);
      })
      .catch(() => {
        done(null, null, req.flash('loginMessage', 'Incorrect username or password'));
      });
  }));

passport.use('google', new GoogleStrategy({
  clientID: config.passport.Google.clientID,
  clientSecret: config.passport.Google.clientSecret,
  callbackURL: `${config.env.serverUrl}/auth/google/callback`,
},
  (accessToken, refreshToken, profile, done) => {
    getOrCreateOAuthProfile('google', profile, done);
  })
);

passport.use('facebook', new FacebookStrategy({
  clientID: config.passport.Facebook.clientID,
  clientSecret: config.passport.Facebook.clientSecret,
  callbackURL: `${config.env.serverUrl}/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name']
},
  (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('facebook', profile, done))
);

// REQUIRES PERMISSIONS FROM TWITTER TO OBTAIN USER EMAIL ADDRESSES
const twitterOptions = {
  consumerKey: config.passport.Twitter.consumerKey,
  consumerSecret: config.passport.Twitter.consumerSecret,
  callbackURL: `${config.env.serverUrl}/auth/twitter/callback`,
  userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
};

passport.use('twitter', new TwitterStrategy(twitterOptions,
  (accessToken, refreshToken, profile, done) => getOrCreateOAuthProfile('twitter', profile, done))
);

const twitterCallback = (accessToken, refreshToken, profile, done) =>
  getOrCreateOAuthProfile('twitter', profile, done);

passport.use('twitter', new TwitterStrategy(twitterOptions, twitterCallback));

module.exports = passport;
