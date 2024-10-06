import { Contact } from "../models/contactsModel.js";

// This is how the MVC Architecture looks like

const getAllContacts = async (_req, res, next) => {
  // HOMEWORK 2
  // Calls the listContacts function to work with the JSON file `contacts.json
  // Returns an array of all contacts in json format with status 200

  // HOMEWORK 3
  // we need to make use of the find() method from mongoose
  // find() method returns all the documents from the database without a query parameter
  try {
    // const result = await listContacts();
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  // Gets the id parameter
  // Calls the getById function to work with the contacts.json JSON file
  // If there is such an id, returns the contact object in JSON format with status 200
  // If there is no such id, returns json with "message": "Not found" key and 404 status

  try {
    const { contactId } = req.params;

    // this allows for a more flexible query allowing us to pass different fields
    const result = await Contact.findOne({ _id: contactId });

    // this is strictly querying using the id
    // const result = Contact.findById(contactId);

    // early return pattern means we want to skip our function body early if the required constants are falsy

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error); // default middleware handler ni express
  }
};

const addContact = async (req, res, next) => {
  // Gets body in {name, email, phone} format (all fields are required)

  // To apply the validator function that checks whether the request body conforms with the Schema, we make use of the validate() function
  // The validate() function is accessible from the validation object that we have declared using Joi
  // The validate() function accepts one argument which is the request body
  // The error object is accessible as a return value from the validate function and through destructuring

  // This is the frontend validation before the MVC architecture
  const { error } = contactValidation.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
  }

  // If there are no required fields in body, returns JSON with key {"message": "missing required name field"} and status 400
  // If everything is fine with body, add a unique identifier to the contact object

  // const result = await addContact({ name, email, phone});
  try {
    const result = await Contact.create(req.body);
    // const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  // Calls the addContact(body) function to save the contact in the contacts.json file
  // Based on the result of the function, it returns an object with the added id {id, name, email, phone} and status 201
};

const deleteContact = async (req, res, next) => {
  // Gets the id parameter
  // Calls the removeContact function to work with the JSON file contacts.json
  // If there is such an id, it returns JSON of the format {"message": "contact deleted"} with status 200
  // If there is no such id, returns JSON with the key "message": "Not found" and status 404
  try {
    const { contactId } = req.params;
    // const result = await removeContact(contactId);
    const result = await Contact.findByIdAndDelete(contactId);
    // const result = await Contact.findOneAndRemove(contactId);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }

  return result;
};

const updateContact = async (req, res, next) => {
  // Gets body in JSON format, updating any name, email и phone fields
  // If there is no body, returns json with key {"message": "missing fields"} and status 400
  // If everything is fine with body, call the updateContact(contactId, body) function (write it) to update the contact in the contacts.json file
  // Based on the result of the function, it returns an updated contact object with a status of 200. Otherwise, returns json with "message": "Not found" key and 404 status
  const { error } = contactValidation.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
  }

  try {
    // const result = await updateContact(req.params.contactId, req.body);
    const result = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body
    );

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
};
