// Task 2:  CRUD Operations
// Find all Fantasy books
db.books.find({ genre: "Fantasy" });


// Task 3: Advanced Queries
// Books in stock published after 2010

db.books.find({ 
  in_stock: true, 
  published_year: { $gt: 2010 } 

});


// Page 1
db.books.find().skip(0).limit(5);  
// Page 2 
db.books.find().skip(5).limit(5);  


// Task 4: Aggregation
// Average price by genre

db.books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]);


db.books.aggregate([
  { $group: { 
      _id: "$author", 
      bookCount: { $sum: 1 } 
  }},
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);


db.books.aggregate([
  { $project: {
      decade: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      }
  }},
  { $group: {
      _id: "$decade",
      count: { $sum: 1 }
  }}
]);


// Create multiple indexes sequentially

db.books.createIndex({ title: 1 })  // Single index
db.books.createIndex({ author: 1, published_year: 1 });  // Compound index


// Task 5: Index Verification

db.books.find({ title: "1984" }).explain("executionStats");
db.books.find({ author: "George Orwell", published_year: { $gt: 1940 } })
  .explain("executionStats");