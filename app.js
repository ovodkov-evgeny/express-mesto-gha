const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  NOT_FOUND_CODE,
} = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62ab09db19841eb824f0f08f',
  };
  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Запрошена не существующая страница' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
