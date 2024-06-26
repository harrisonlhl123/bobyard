const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
  // check('id')
  //   .exists({ checkFalsy: true })
  //   .withMessage("id can't be blank"),
  // check('parent')
  //   .exists({ checkFalsy: true })
  //   .withMessage("Parent can't be blank"),
  check('author')
    .exists({ checkFalsy: true })
    .withMessage("Author can't be blank"),
  check('text')
    .exists({ checkFalsy: true })
    .withMessage("Text can't be blank"),
  // check('date')
  //   .exists({ checkFalsy: true })
  //   .withMessage("Date can't be blank"),
  // check('likes')
  //   .exists({ checkFalsy: true })
  //   .withMessage("Likes can't be blank"),
  // check('image')
  //   .exists({ checkFalsy: true })
  //   .withMessage("Image can't be blank"),
  handleValidationErrors
];

module.exports = validateCommentInput;