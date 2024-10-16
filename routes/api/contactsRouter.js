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

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, getAllContacts);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: ID of the contact to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 */
router.get("/:contactId", authenticateToken, getContactById);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Add a new contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Successfully created a new contact
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, addContact);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: ID of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted the contact
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:contactId", authenticateToken, deleteContact);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: ID of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Successfully updated the contact
 *       400:
 *         description: Validation error
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:contactId", authenticateToken, updateContact);

export { router };
