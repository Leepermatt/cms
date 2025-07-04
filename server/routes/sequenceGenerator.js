const Sequence = require('../models/sequence');

let maxDocumentId = 0;
let maxMessageId = 0;
let maxContactId = 0;
let sequenceId = null;

class SequenceGenerator {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const sequence = await Sequence.findOne().exec();
      if (!sequence) {
        throw new Error('No sequence found in the database.');
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    } catch (err) {
      console.error('Failed to initialize SequenceGenerator:', err.message);
    }
  }

  nextId(collectionType) {
    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'documents':
        maxDocumentId++;
        updateObject = { maxDocumentId };
        nextId = maxDocumentId;
        break;
      case 'messages':
        maxMessageId++;
        updateObject = { maxMessageId };
        nextId = maxMessageId;
        break;
      case 'contacts':
        maxContactId++;
        updateObject = { maxContactId };
        nextId = maxContactId;
        break;
      default:
        return -1;
    }

    Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
      .then(() => {})
      .catch(err => {
        console.error('nextId update error:', err.message);
      });

    return nextId;
  }
}

module.exports = new SequenceGenerator();
