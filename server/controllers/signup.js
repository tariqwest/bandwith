const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Song.fetchAll()
    .then((songs) => {
      res.status(200).send(songs);
    })
    .catch((err) => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.update = (req, res) => {
  const profileBody = {
    first: req.body.first,
    last: req.body.last,
    zipCode: req.body.zipCode,
    gender: req.body.gender,
    bio: req.body.bio,
    song_url: req.body.song_url,
    video_url: req.body.video_url,
    age: req.body.age,
    searchRadius: req.body.searchRadius,
  };

  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.save(profileBody, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error((err) => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
  // models.Profile.forge({
  //   song_src: body.song,
  //   first: body.song,
  //   last: body.last,
  //   bio: body.bio,
  //   zipCode: body.zipCode,
  //   gender: body.gender,
  // })
  // .save()
  // .then((result) => {
  //   res.status(201).send(result);
  // })
  // .catch((err) => {
  //   res.status(500).send(err);

  // models.Song.forge({ song_url: body.song })
  //   .save()
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });

  // models.Video.forge({ video_url: body.video })
  //   .save()
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
  // });

  // instruments
  // users_instruments

  // influences
  // users_influences

  // genres
  // users_genres

  // preferred_instruments
  // preferred_genres

  // models.Song.forge({ song_url: body.song })
  //   .save()
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
};

module.exports.getOne = (req, res) => {
  models.Song.where({ id: req.params.id }).fetch()
    .then((song) => {
      if (!song) {
        throw song;
      }
      res.status(200).send(song);
    })
    .error((err) => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// module.exports.update = (req, res) => {
//   models.Song.where({ id: req.params.id }).fetch()
//     .then((song) => {
//       if (!song) {
//         throw song;
//       }
//       return song.save(req.body, { method: 'update' });
//     })
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .error((err) => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

module.exports.deleteOne = (req, res) => {
  models.Song.where({ id: req.params.id }).fetch()
    .then((song) => {
      if (!song) {
        throw song;
      }
      return song.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error((err) => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
