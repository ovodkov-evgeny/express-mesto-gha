const User = require('../models/user');
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  DEFAUTL_CODE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((result) => res.send(result))
    .catch(() => res
      .status(DEFAUTL_CODE)
      .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'Передан некорректный id пользователя' });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};
