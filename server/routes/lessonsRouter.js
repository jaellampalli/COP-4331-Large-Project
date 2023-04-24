const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');
let client;

async function main()
{
    client = new MongoClient(process.env.MONGO_URI);
    console.log("lessonsRouter - Ready");
}
main().catch(console.error);

// Takes in email and the title of the lesson, and returns either an error stating no data found or an object with a specifc user lesson data.
router.post("/retrieve-lesson", async (req, res) => {
    console.log("retrieving lesson");
    await client.connect();
    let lessonsDB = client.db("projectdb").collection("lessons");

    try {
        // Extract username and title of the lesson from the req.body object
        const { email, title } = req.body;
        console.log("Input:");
        console.log(req.body);

        var titleMarker = title + "_mark";
        var titleNotes = title + "_notes";

        // Check if user exists in database
        let userData = await lessonsDB.findOne({"email": email}, {projection : {[titleMarker]: 1, [titleNotes]: 1, "_id":0}});

        if (!userData) {
            return res.status(401).json({ message: "No User Data Found" });
        }

        console.log("Found user " + email + "'s lesson data for " + title);
        console.log(userData);
        // If found return all the user's information related to the lesson (notes and marker)
        return res.status(200).json(userData);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

// Takes in email, and returns either an error stating no data found or an object with all the user's lesson data.
router.post("/retrieve-all-lessons", async (req, res) => {
    console.log("retrieving all lessons");
    await client.connect();
    let lessonsDB = client.db("projectdb").collection("lessons");

    try {
        // Extract username from the req.body object
        const { email } = req.body;
        console.log("Input:");
        console.log(req.body);

        // Check if user exists in database
        let userData = await lessonsDB.findOne({ email: email });

        if (!userData) {
            return res.status(401).json({ message: "No User Data Found" });
        }

        // If found return all of the user's information (notes and markers)
        console.log("Found user " + email + "'s lesson data");
        console.log(userData);
        return res.status(200).json(userData);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

// Takes in the email, title of the lesson, the new marker value, and the new notes, and returns either an error or a confirmation that the user's information has been updated.
router.post("/edit-user-lesson", async (req, res) => {
    console.log("editing user's lesson data");
    await client.connect();
    let lessonsDB = client.db("projectdb").collection("lessons");

    try {
        // Extract the username, current lesson title, updated marker value and updated notes from the req.body object
        let { email, title, newMarker, newNotes } = req.body;
        newMarker = parseInt(newMarker);
        console.log("Input:");
        console.log(req.body);

        // Create two strings using the title for the fields to update
        var titleMarker = title + "_mark";
        var titleNotes = title + "_notes";
        // Check if user exists in database
        let lessonInfo = await lessonsDB.findOne({ email: email });

        if (!lessonInfo) {
            return res.status(401).json({ message: "No User Data Found" });
        }

        // Update the specific fields for the user's information in the database
        var newValues = { $set: { [titleMarker]: newMarker, [titleNotes]: newNotes } };
        await lessonsDB.updateOne(lessonInfo, newValues, function(err, res) {
          if (err) throw new Error("Updating data error");
        });
        
        return res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router;