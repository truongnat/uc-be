const httpStatus = require('http-status');
const { Link } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a link
 * @param {Object} linkBody
 * @param {ObjectId} userId
 * @returns {Promise<Link>}
 */
const createLink = async (linkBody, userId) => {
  if (await Link.isTypeTaken(linkBody.type)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Type already taken');
  }

  const linkDoc = await Link.create({
    ...linkBody,
    user: userId,
  });

  return linkDoc;
};

/**
 * Query for links
 * @param {String} userId - userId
 * @returns {Promise<QueryResult>}
 */
const queryLinks = async (userId) => {
  const links = await Link.find({ user: userId });
  return links;
};

/**
 * Get link by id
 * @param {ObjectId} id
 * @returns {Promise<Link>}
 */
const getLinkById = async (id) => {
  return Link.findById(id);
};

/**
 * Update link by id
 * @param {ObjectId} linkId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateLinkById = async (linkId, updateBody) => {
  const link = await getLinkById(linkId);
  if (!link) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
  }
  if (updateBody.type && (await Link.isTypeTaken(updateBody.type))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Type already taken');
  }
  Object.assign(link, updateBody);
  await link.save();
  return link;
};

/**
 * Delete link by id
 * @param {ObjectId} linkId
 * @returns {Promise<Link>}
 */
const deleteLinkById = async (linkId) => {
  const link = await getLinkById(linkId);
  if (!link) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link not found');
  }
  await link.remove();
  return link;
};

module.exports = {
  createLink,
  queryLinks,
  getLinkById,
  updateLinkById,
  deleteLinkById,
};
