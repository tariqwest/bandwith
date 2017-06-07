const models = require('../../db/models');

module.exports.getOne = (req, res) => {
  models.Location.where({ zipcode: req.params.zipcode }).fetch()
    .then((location) => {
      res.status(200).send(location);
    })
    .error(err => res.status(500).send(err))
    .catch(() => res.sendStatus(404));
};
