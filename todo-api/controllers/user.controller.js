import db from '../models/index.js';
const User = db.user;

export const fetchUser = (req, res) => {
  User.findOne({ where: { username: req.body.username, password: req.body.password } })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      } else {
        res.status(200).send({
          user: {
            firstname: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving the user.'
      });
    });
};
