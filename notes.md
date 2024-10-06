- Why do we need to set a schema?
- THERE IS NO STRICT UNIFORM FORMAT THAT IS FOLLOWED FOR DATA BEING SAVED IN MONGODB

- SCHEMA
- enforces uniformity across the data or document fields being saved in the mongodb collection
- this does not mean that all of the fields we declare in the schema is mandatory
- there is an option for us to assign a mandatory or required field
- and its also possible for us to make a field optional
- the important thing is that all the fields that can be added in the document object must adhere to the fields declared in the document schema

- Syntax for creating a Schema
  const ContactSchema = mongoose.Schema;

- MVC Architecture
- Model View Controller Architecture
- Model refers to the schema that we are applying the our object models
- View refers to the data presentation for the response from the route
- Controller refers to the function managing the responses of our routes

- Persisting the data to Mongodb
- We need to append the database name at the end of our cluster connection string
- If we do not append the db name, the documents will automatically be saved to the "test" database
- Call mongoose methods/CRUD methods to interact with the MongoDB database
- Collections refer to folders inside of a database
- Documents refer to the individual items inside of a collection

- Sending HTTP Requests
- For PUT, PATCH and POST requests always do frontend validation before saving to database
