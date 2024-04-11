const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
const validateCommentInput = require('../../validations/comments');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
                              .sort({ createdAt: -1 });

    let commentsObject = {}
    comments.forEach((comment) => {
      commentsObject[comment._id] = comment;
    })

    return res.json(commentsObject);
  }
  catch(err) {
    return res.json([]);
  }
});

// Get one comment
router.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
  
    return res.json(comment);
  }
  catch(err) {
    const error = new Error('Comment not found');
    error.statusCode = 404;
    error.errors = { message: "No comment found with that id" };
    return next(error);
  }
});


// Create a comment
router.post('/', requireUser, validateCommentInput, async (req, res, next) => {
    try {
      const newComment = new Comment({
        text: req.body.text,
        author: req.user.author
      });
  
      let comment = await newComment.save();
      return res.json(comment);
    }
    catch(err) {
      next(err);
    }
});

// Edit a comment
router.patch('/:id', requireUser, async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      {_id: req.params.id},
      {
        // Use the $set operator to update the specified fields (in this case, the 'text' field)
        $set: {
          text: req.body.text
        }
      },
      // Set { new: true } to return the updated document instead of the original one
      {new: true}
    )

    // If the comment is not found, handle error
    if (!comment){
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id or unauthorized access'};
      return next(error);
    }

    // If the comment is successfully updated, return the updated comment in the response
    return res.json(comment)
  } catch (err) {
    // If an error occurs during the update process, pass it to the error handling middleware
    next(err);
  }

});


router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id
    });
    if (!comment){
      const error = new Error('Comment not found')
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }
    return res.json({ message: 'Comment deleted successfully' });
  } catch(err) {
    next(err);
  }
})

module.exports = router;