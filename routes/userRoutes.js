const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddlewares');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - loginuser
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         loginuser:
 *           type: string
 *           description: The login username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         active:
 *           type: boolean
 *           description: Indicates if the user is active
 *       example:
 *         username: John Cezar
 *         loginuser: cezar.john
 *         password: secret@123
 *         active: true
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users (username, loginuser, and active status)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integers
 *                   username:
 *                     type: string
 *                   loginuser:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get('/users', authenticateToken, userController.listUsers);

/**
 * @swagger
 * /users/{id}/activate:
 *   patch:
 *     summary: Activate a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user to activate
 *     responses:
 *       200:
 *         description: User (USERNAME) activated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
router.patch('/users/:id/activate', authenticateToken, userController.activateUser);

/**
 * @swagger
 * /users/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user to deactivate
 *     responses:
 *       200:
 *         description: User (USERNAME) deactivated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
router.patch('/users/:id/deactivate', authenticateToken, userController.deactivateUser);

/**
 * @swagger
 * /users/{id}/password:
 *   patch:
 *     summary: Update a user's password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user to update the password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
router.patch('/users/:id/password', authenticateToken, userController.updatePassword);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user's username and loginuser
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the user to update the username and loginuser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username for the user
 *               loginuser:
 *                 type: string
 *                 description: The new loginuser for the user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
router.patch('/users/:id', authenticateToken, userController.updateUser);

module.exports = router;
