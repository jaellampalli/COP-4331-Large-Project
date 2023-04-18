const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const { MongoClient } = require('mongodb');
let client;

async function main()
{
    client = new MongoClient(process.env.MONGO_URI);
    console.log("usersRouter - Ready");
}
main().catch(console.error);

router.post("/sign-up", async (req, res) => {
    console.log("signing up");
    await client.connect();
    let userDB = client.db("projectdb").collection("users");
    let userInfoDB = client.db("projectdb").collection("userInfo");

    try 
    {
        // Extract username and password from the req.body object
        const { email, password } = req.body;
        console.log("Input:");
        console.log(req.body);

        // Check if the username is already in use
        let userExists = await userDB.findOne({ email: email });
        if (userExists) {
            res.status(401).json({ message: "Email is already in use." });
            return;
        }

        // Define salt rounds
        const saltRounds = 10;

        // Hash password
        bcrypt.hash(password, saltRounds, (err, hash) => 
        {
            if (err) throw new Error("Internal Server Error");
            // Creates a new document with all markers and notes associated to an email
            let newUserInfo = {
                email: email,
                bubblesort_mark: 0,
                mergesort_mark: 0,
                radixsort_mark: 0,
                selectionsort_mark: 0,
                quicksort_mark: 0,
                bucketsort_mark: 0,
                bfs_mark: 0,
                dfs_mark: 0,
                kruskals_mark: 0,
                prims_mark: 0,
                bubblesort_notes: "",
                mergesort_notes: "",
                radixsort_notes: "",
                selectionsort_notes: "",
                quicksort_notes: "",
                bucketsort_notes: "",
                bfs_notes: "",
                dfs_notes: "",
                kruskals_notes: "",
                prims_notes: "",
            };
            // Create a new user associated with an email and a hashed password
            let newUser = {
                email: email,
                password: hash,
            };
            // Save user and the user's info to the database
            userDB.insertOne(newUser);
            userInfoDB.insertOne(newUserInfo);
            console.log("Added new user")
            return res.status(200).json({ message: "New account added" });
        });
    } 
    catch (err) 
    {
        return res.status(401).send(err.message);
    }
});

router.post("/sign-in", async (req, res) => {
    console.log("signing in");
    await client.connect();
    let userDB = client.db("projectdb").collection("users");

    try {
        // Extract username and password from the req.body object
        const { email, password } = req.body;
        console.log("Input:");
        console.log(req.body);

        // Check if user exists in database
        let user = await userDB.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        console.log("Found user:");
        console.log(user);

        // Compare passwords
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                return res.status(200).json({ message: "User Logged in Successfully" });
            }

            console.log(err);
            return res.status(401).json({ message: "Invalid Credentials" });
        });
    } catch (error) {
        res.status(401).send(err.message);
    }
});

router.post("/retrieve-info", async (req, res) => {
    console.log("retrieving info");
    await client.connect();
    let userInfoDB = client.db("projectdb").collection("userInfo");

    try {
        // Extract username from the req.body object
        const { email } = req.body;
        console.log("Input:");
        console.log(req.body);

        // Check if user exists in database
        let userInfo = await userInfoDB.findOne({ email: email });

        if (!userInfo) {
            return res.status(401).json({ message: "No User Data Found" });
        }

        console.log("Found user:");
        console.log(userInfo);
        // If found return all of the user's information (notes and markers)
        return res.status(200).json(userInfo);
    } catch (error) {
        res.status(401).send(err.message);
    }
});

router.post("/edit-info", async (req, res) => {
    console.log("editing info");
    await client.connect();
    let userInfoDB = client.db("projectdb").collection("userInfo");

    try {
        // Extract the username, current lesson title, updated marker value and updated notes from the req.body object
        const { email, title, newMarker, newNotes } = req.body;
        console.log("Input:");
        console.log(req.body);

        // Create two strings using the title for the fields to update
        var titleMarker = title + "_mark";
        var titleNotes = title + "_notes";
        // Check if user exists in database
        let userInfo = await userInfoDB.findOne({ email: email });

        if (!userInfo) {
            return res.status(401).json({ message: "No User Data Found" });
        }

        // Update the specific fields for the user's information in the database
        var newValues = { $set: { [titleMarker]: newMarker, [titleNotes]: newNotes } };
        await userInfoDB.updateOne(userInfo, newValues, function(err, res) {
          if (err) throw new Error("Updating data error");
        });
        
        return res.status(200).json({ message: "Updated Successfully" });
    } catch (error) {
        res.status(401).send(err.message);
    }
});

module.exports = router;
// export default usersRouter;