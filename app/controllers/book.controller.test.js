const request = require("supertest");
const app = require("../../app");
describe('Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })

  describe("GET / ", () => {
    test("It should respond with an array of books", async () => {
      const response = await request(app).get("/api/books");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /students", () => {
    test("It responds with the newly created book", async () => {
      const book = await request(app)
        .post("/api/books")
        .send({
          title: "New book"

        });
      expect(book.statusCode).toBe(200);
    });
  });