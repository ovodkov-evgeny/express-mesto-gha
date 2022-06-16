const Card = require('../models/card');
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  DEFAUTL_CODE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((result) => res.send(result))
    .catch(() => res
      .status(DEFAUTL_CODE)
      .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: `Переданы некорректные данные: ${error.message}` });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardID)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Карточка не найдена.' });
      }
      res.send({ message: 'Карточка удалена' });
    })

    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: 'Переданы некорректные данные' });
      }
      return res
        .status(DEFAUTL_CODE)
        .send({ message: `${DEFAUTL_CODE}: Ошибка сервера` });
    });
};
