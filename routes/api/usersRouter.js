import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUsers,
  updateUserSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/auth.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

// FOR PUT, PATCH and POST requests always do frontend validation before saving to database

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully created a new user
 *       400:
 *         description: Validation error
 */
router.post("/signup", signupUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Log out the user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
router.get("/logout", authenticateToken, logoutUser);

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get the current logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved current user
 *       401:
 *         description: Unauthorized
 */
router.get("/current", authenticateToken, getCurrentUsers);

/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update the user's subscription
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscription:
 *                 type: string
 *                 enum: [starter, pro, business]
 *                 description: New subscription plan
 *     responses:
 *       200:
 *         description: Successfully updated the user's subscription
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.patch("/", authenticateToken, updateUserSubscription);

/**
 * @swagger
 * /api/users/avatars:
 *   patch:
 *     summary: Update the user's avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The avatar image to upload
 *     responses:
 *       200:
 *         description: Successfully updated the avatar
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/avatars",
  authenticateToken,
  upload.single("avatar"),
  updateAvatar
);

/**
 * @swagger
 * /api/users/verify/{verificationToken}:
 *   get:
 *     summary: Verify a user’s email
 *     tags: [Users]
 *     parameters:
 *       - name: verificationToken
 *         in: path
 *         required: true
 *         description: The verification token sent via email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully verified the email
 *       404:
 *         description: Verification token not found
 */
router.get("/verify/:verificationToken", verifyEmail);

/**
 * @swagger
 * /api/users/verify:
 *   post:
 *     summary: Resend the email verification token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email to resend verification
 *     responses:
 *       200:
 *         description: Verification email resent
 *       400:
 *         description: Validation error
 */
router.post("/verify", authenticateToken, resendVerifyEmail);

export { router };
