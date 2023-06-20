const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { linkController } = require('../../controllers');
const { linkValidation } = require('../../validations');

const router = express.Router();

router.route('/');
router
  .get('/', auth(), linkController.getLinks)
  .post('/', auth(), validate(linkValidation.createLink), linkController.createLink)
  .patch('/:linkId', auth(), validate(linkValidation.updateLink), linkController.updateLink)
  .delete('/:linkId', auth(), validate(linkValidation.deleteLink), linkController.updateLink);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Links
 *   description: Manager Links
 */

/**
 * @swagger
 * /links:
 *   post:
 *     summary: Create a link
 *     description: User can create link.
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - link
 *               - status
 *               - type
 *             properties:
 *               link:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [unknown, facebook, tiktok, zalo, youtube]
 *               status:
 *                 type: boolean
 *                 description: public or private link
 *             example:
 *               link: https://facebook.com/12245
 *               type: unknown
 *               status: false
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Link'
 *       "400":
 *         $ref: '#/components/responses/DuplicateLink'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all links
 *     description: Get all link of user.
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Link'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
