
module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const { validator } = require('express-fastest-validator');


const schema = {
   body:{ 
    title: { type: "string", min: 3, max: 255 },
    description: { type: "string", min: 3, max: 255 },
    author: { type: "string", min: 3, max: 255 },
    price: { type: "number", positive: true, integer: true }
  }
};

    var router = require("express").Router();
  
    router.post("/", validator(schema),books.create);                        //create
  
    router.get("/", books.findAll);                        //find all  
  
    router.get("/:id", books.findOne);                     //find with id

    router.put("/:id", books.update);                      //update with id
    
    router.delete("/:id", books.delete);                   //delete with id
    
    router.delete("/", books.deleteAll);                   //delete all
  
    app.use('/api/books', router);        
  };
  