const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { linkValidation } = require('./utils/linkValidation');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(linkValidation),
  }),
}), createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res, next) => next(
  new NotFoundError('Запрошен не существующий ресурс'),
));

app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
