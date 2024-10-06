import Joi from "joi";

// Joi is an object schema validation library that works similarly with Mongoose Schema
// To create a validator function, we can make use of the object() method and pass an object that contains the required parameters that we want to set in our request body

// JOI VALIDATION
// validates the data before sending it as the request body to a server route or endpoint
// this happens before the network request is sent

// Define validation for adding/updating a contact
const contactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

// validation for updating favorite field
const favoriteValidation = Joi.object({
  favorite: Joi.bool().required(),
});

// validation for signup
const signupValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
  password: Joi.string().min(6).max(16).required().messages({
    "any.required": "Missing required password field",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be longer than {#limit} characters",
  }),
});

const subscriptionValidation = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

// validation for email
const emailValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
});

// prettier-ignore
export { contactValidation, favoriteValidation, signupValidation, subscriptionValidation, emailValidation };
