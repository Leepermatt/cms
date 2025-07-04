const express = require('express');
const router = express.Router();

const Message = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');
const Sequence = new sequenceGenerator();

// GET: return all messages
router.get('/', (req, res, next) => {
  Message.find()
    .populate('sender')
    .then(messages => {
      res.status(200).json({
        message: 'Messages fetched successfully!',
        messages: messages
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// POST: add a new message
router.post('/', (req, res, next) => {
  const maxMessageId = Sequence.nextId('messages');

  const message = new Message({
    id: maxMessageId.toString(),
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        createdMessage: createdMessage
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// PUT: update an existing message
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      return message.save();
    })
    .then(result => {
      res.status(204).json({ message: 'Message updated successfully' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// DELETE: remove a message
router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      return Message.deleteOne({ id: req.params.id });
    })
    .then(result => {
      res.status(204).json({ message: 'Message deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;
