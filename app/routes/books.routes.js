module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", books.create);                        //create
  
    router.get("/", books.findAll);                        //find all  
  
    router.get("/:id", books.findOne);                     //find with id

    router.put("/:id", books.update);                      //update with id
    
    router.delete("/:id", books.delete);                   //delete with id
    
    router.delete("/", books.deleteAll);                   //delete all
  
    app.use('/api/books', router);        
  };
  