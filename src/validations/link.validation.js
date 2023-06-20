const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { socials } = require('../config/social');

const createLink = {
  body: Joi.object().keys({
    link: Joi.string().required().uri(),
    status: Joi.bool().required(),
    type: Joi.string()
      .required()
      .valid(...socials),
  }),
};

const updateLink = {
  body: Joi.object().keys({
    link: Joi.string().required().uri(),
    status: Joi.bool().required(),
    type: Joi.string()
      .required()
      .valid(...socials),
  }),
  params: Joi.object().keys({
    linkId: Joi.string().custom(objectId),
  }),
};

const deleteLink = {
  params: Joi.object().keys({
    linkId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLink,
  updateLink,
  deleteLink,
};
