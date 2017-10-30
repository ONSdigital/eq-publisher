module.exports = converter => (req, res, next) => {
  try {
    res.locals.questionnaire = converter.convert(res.locals.questionnaire);
    next();
  } catch (err) {
    next(err);
  }
};
