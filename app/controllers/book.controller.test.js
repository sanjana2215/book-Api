const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../models");
const book =require('./book.controller.js');

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
          title: "New book1",
          description:'new',
          author:'auth',
          price: Math.floor(Math.random()*(1000))
        });
      expect(book.statusCode).toBe(200);
    });
  });
  describe('create',()=>{
  test('post',async()=>{
    const newBook={
      title: "New book1",
      description:'new',
      author:'auth',
      price: Math.floor(Math.random()*(1000))
    }
    jest.spyOn(book, 'create').mockResolvedValue(undefined)
          const response= await request(app)
            .post("/api/books")
            .send(newBook);
            //console.log(response.body)
          expect(response.body.title).toEqual(newBook.title);
    })
    test('post',async ()=>{
    
      jest.spyOn(book, 'create').mockRejectedValueOnce('err')
      const response = await request(app).post("/api/books");
      //console.log(response)
     expect(response).toHaveProperty('error');
    })

  })
describe('getgroup', ()=>{
  test('get',async ()=>{
    const bookList= {
      author: 'JK Rowling', 
      createdAt: "2022-06-23T14:23:52.000Z",
      description: "drama & Fantasy",
      id: 1,
      price: 499,
      title: "Harry Potter and safe security",
      updatedAt: "2022-06-23T14:23:52.000Z",
    }
    jest.spyOn(book, 'findAll').mockResolvedValueOnce(bookList)
    const response = await request(app).get("/api/books");
   // console.log(response)
    expect(response.body[0]).toEqual(bookList);

   })
  
  test('get',async ()=>{
    
    jest.spyOn(book, 'findAll').mockRejectedValueOnce('err')
    const response = await request(app).get("/api/books");
    //console.log(response)
   expect(response).toHaveProperty('error');

  })
  
})
  
