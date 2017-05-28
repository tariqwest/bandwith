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

module.exports.create = (req, res) => {
  models.Song.forge({ song_url: req.body.song })
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
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

module.exports.update = (req, res) => {
  models.Song.where({ id: req.params.id }).fetch()
    .then((song) => {
      if (!song) {
        throw song;
      }
      return song.save(req.body, { method: 'update' });
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
};

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
