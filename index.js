//import and use express js
const express = require("express");
const app = express();

//---------------------------------------------------
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./swagger");

//--------------------------------------------------

//route to the books model
const Book = require("./models/model");
//import the middle ware to be used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//******************************************************************************************************************

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 *   /books:
 *     get:
 *       summary: Get all the books
 *       tags: [Books]
 *       responses:
 *         200:
 *           description: The list of the books
 *           content:
 *             application/json:
 *               schema:
 *                 items:
 *                   $ref: '#/components/schemas/Book'
 *         "404":
 *           $ref: '#/components/response/404'
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 *   /books/{id}:
 *     get:
 *       summary: Get a book by id
 *       tags: [Books]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id of a book
 *       responses:
 *         200:
 *           description: The list of the books
 *           content:
 *             application/json:
 *               schema:
 *                 items:
 *                   $ref: '#/components/schemas/Book'
 *         "404":
 *           $ref: '#/components/response/404'
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 *   /books:
 *     post:
 *       summary: Add a book
 *       tags: [Books]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       responses:
 *         200:
 *           description: Book created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 items:
 *                   $ref: '#/components/schemas/Book'
 *         "404":
 *           $ref: '#/components/response/404'
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 *   /books/{id}:
 *     put:
 *       summary: Update a book
 *       tags: [Books]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the book to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       responses:
 *         200:
 *           description: Book updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 *         "500":
 *           $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 *   /books/{id}:
 *     delete:
 *       summary: Get a book by id
 *       tags: [Books]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: id of a book
 *       responses:
 *         200:
 *           description: The list of the books
 *           content:
 *             application/json:
 *               type: object
 *         "404":
 *           $ref: '#/components/response/404'
 *         500:
 *           description: Internal server error
 */

//******************************************************************************************************************

//create post some data into the db
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//read get all the books from the db
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//read get a single book from the db
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update put a certain book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) console.log(`Book with id ${id} not found`);

    const updatedBook = await Book.findById(id);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete a certain book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) console.log(`Book with id ${id} not found`);
    res.status(200).json({ message: "book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//---------------------------------------------------------------#
const spacs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));
//---------------------------------------------------------------

//import and use mongo db
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1/clasa_db")
  .then(() => {
    console.log("Connected to mongodb successfully");
    app.listen(4000, () => console.log(`Server running on port 4000`));
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
