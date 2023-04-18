const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    console.log("Connecting...");
    if (client.db("projectdb"))
    {
      console.log("Successfully connected to MongoDB.");
      _db = client.db("projectdb");
    }
    else
    {
      console.log("Error - Cound not connect to database.")
    }
  },
 
  getDb: function () {
    return _db;
  },
};