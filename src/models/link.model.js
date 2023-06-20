const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { socials } = require('../config/social');

const linkSchema = mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Invalid link');
        }
      },
    },
    type: {
      type: String,
      enum: socials,
      default: 'unknown',
    },
    status: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
linkSchema.plugin(toJSON);
linkSchema.plugin(paginate);

/**
 * Check if type is taken
 * @param {string} type - The type of link
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
linkSchema.statics.isTypeTaken = async function (type, excludeUserId) {
  const link = await this.findOne({ type, _id: { $ne: excludeUserId } });
  return !!link;
};

/**
 * @typedef Link
 */
const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
