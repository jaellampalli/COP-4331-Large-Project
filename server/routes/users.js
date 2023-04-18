const express = require("express");
 
// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
userRoutes.route("/users").get(async function (req, res) {
 let db_connect = dbo.getDb("users");
 console.log("Getting all users...");
 result = await db_connect
   .collection("users")
   .find()
   .toArray();
  console.log(result.length);
  res.json(result);
});
 
// This section will help you get a single record by id
userRoutes.route("/users/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 db_connect
   .collection("users")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
userRoutes.route("/users/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("users").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
userRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("users")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
userRoutes.route("/:id").delete(async (req, response) => {
  let db_connect = dbo.getDb();
  let users = db_connect.collection("users");
  let userId = req.params.id;
  console.log("Searching for user " + userId + "...")
  myquery = await users.findOne({ "_id": new ObjectId(req.params.id) });
  
  if (!myquery)
  {
    console.log("User not found");
    return;
  }

  console.log("Found user:")
  console.log(myquery);
  obj = await users.deleteOne(myquery);
  console.log("Deleted user\n");
  response.json(obj);  
});
 
module.exports = userRoutes;