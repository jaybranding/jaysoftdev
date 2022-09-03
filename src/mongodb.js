const dotenv = require("dotenv");
dotenv.config();

var MongoClient = require("mongodb").MongoClient;
var url = process.env.mongoURI;

MongoClient.connect(url, function (err, db) {
  if (err) throw err;

  async function printLocation(province) {
    const pipeline = [
      {
        $match: {
          Province: province,
        },
      },
      {
        $skip: 50,
      },
      {
        $limit: 10,
      },
    ];
    const aggCursor = db
      .db("FindenVietnam")
      .collection("Company")
      .aggregate(pipeline);
    await aggCursor.forEach((companyListing) => {
      console.log(`${companyListing._id}: ${companyListing.Company}`);
    });
    db.close();
  }
  printLocation("TP Hồ Chí Minh");
});
