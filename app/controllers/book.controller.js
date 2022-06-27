const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

//const check = v.compile(schema);

exports.create = (req, res) =>{ 
    const book = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price
  };

 Book.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the book instance."
      });
    });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Book.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      //console.log(err)
      res.send(err)
      // res.status(500).send({
      //   message:
      //     err.message || "Some error occurred while retrieving books."
      // });
    });
};

// Find a single book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Book.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find book with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving book with id=" + id
      });
    });
};

// Update a book by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "book was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update book with id=${id}. Maybe book was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating book with id=" + id
      });
    });
};

// Delete a book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "book was deleted successfully!"        
        });
      } else {
        res.send({
          message: `Cannot delete book with id=${id}. Maybe book was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete book with id=" + id
      });
    });
};

// Delete all books from the database.
exports.deleteAll = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    });
};

