module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      author:{
        type: Sequelize.STRING
      },
      price:{
        type: Sequelize.INTEGER
      }

    });
     Book.sync();
    return Book;
  };
