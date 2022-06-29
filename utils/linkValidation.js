module.exports.linkValidation = (url, helpers) => {
  const regex = /^https?:\/\/(www\.)?[-\w]*\.[\w]{2,3}.*$/i;
  if (regex.test(url)) {
    return url;
  }
  return helpers.error('Ошибка адреса url');
};
