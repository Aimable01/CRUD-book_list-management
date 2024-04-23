// the swagger documentation
const Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management",
      version: "1.0.0",
      description:
        "This is a simple crud application with express documented with swagger",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          required: ["title", "author", "isbn"],
          properties: {
            name: {
              type: "string",
              description: "Book Title",
            },
            author: {
              type: "string",
              description: "Book Author",
            },
            isbn: {
              type: "number",
              description: "Book ISBN",
            },
          },
        },
      },
      response: {
        404: {
          description: "Not Found",
          contents: "application/json",
        },
      },
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./index.js"],
};

module.exports = Options;
