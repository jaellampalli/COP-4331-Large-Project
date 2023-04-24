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

// Takes in email and password and returns error message or a confirmation for a new user.
router.post("/sign-up", async (req, res) => {
    console.log("signing up");
    await client.connect();
    let userDB = client.db("projectdb").collection("users");
    let lessonsDB = client.db("projectdb").collection("lessons");

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
            let lessonInfo = {
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
                isAdmin: false
            };
            // Save user and the user's info to the database
            userDB.insertOne(newUser);
            lessonsDB.insertOne(lessonInfo);
            console.log("Added new user")
            return res.status(200).json({ message: "New account added" });
        });
    } 
    catch (error) 
    {
        return res.status(401).send(error.message);
    }
});

// Takes in email and password and returns an error message, a sign in confirmation, or a message stating invalid credentials.
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
        res.status(401).send(error.message);
    }
});

// Takes in email and returns either an error message or a boolean stating whether or not the account is an administrator.
router.post("/check-admin", async (req, res) => {
    console.log("verifying if administrator");
    await client.connect();
    let userDB = client.db("projectdb").collection("users");

    try {
        // Extract username from the req.body object
        const { email } = req.body;
        console.log("Input:");
        console.log(req.body);

        // Check if user exists in database
        let user =  await userDB.findOne({"email": email}, {projection : {"isAdmin": 1, "_id":0}});
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        console.log("User Administrator Status:");
        console.log(user);

        return res.status(200).json(user);

    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router;
// export default usersRouter;