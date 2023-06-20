const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { linkService } = require('../services');

const getLinks = catchAsync(async (req, res) => {
  const result = await linkService.queryLinks(req.user._id);
  res.send(result);
});

const createLink = catchAsync(async (req, res) => {
  const link = await linkService.createLink(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(link);
});

const updateLink = catchAsync(async (req, res) => {
  const link = await linkService.updateLinkById(req.params.linkId, req.body);
  res.send(link);
});

const deleteUser = catchAsync(async (req, res) => {
  await linkService.deleteLinkById(req.params.linkId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteUser,
};
