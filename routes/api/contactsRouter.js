import express from "express";
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} from "../../controllers/contactsController.js";
import { authenticateToken } from "../../middlewares/auth.js"; // Import the authenticateToken middleware

const router = express.Router();

// corresponds to listContacts
router.get("/", authenticateToken, getAllContacts);

// corresponds to getContactById
router.get("/:contactId", authenticateToken, getContactById);

// corresponds to addContact
router.post("/", authenticateToken, addContact);

// corresponds to removeContact
router.delete("/:contactId", authenticateToken, deleteContact);

// corresponds to updateContact
router.put("/:contactId", authenticateToken, updateContact);

export { router };
