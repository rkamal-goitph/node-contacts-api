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

/* POST: // http://localhost:3000/api/users/signup */
router.post("/signup", signupUser);

/* POST: // http://localhost:3000/api/users/login */
router.post("/login", loginUser);

/* GET: // http://localhost:3000/api/users/logout */
router.get("/logout", authenticateToken, logoutUser);

/* GET: // http://localhost:3000/api/users/current */
router.get("/current", authenticateToken, getCurrentUsers);

/* PATCH: // http://localhost:3000/api/users/ */
router.patch("/", authenticateToken, updateUserSubscription);

// lets import the upload middleware here that we created in upload.js
// lets call the single() function of multer to restrict the file upload to one file per model or schema field;
router.patch(
  "/avatars",
  authenticateToken,
  upload.single("avatar"),
  updateAvatar
);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", authenticateToken, resendVerifyEmail);

export { router };
