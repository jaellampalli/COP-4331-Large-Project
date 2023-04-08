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

    try 
    {
        // Extract email and password from the req.body object
        const { email, password } = req.body;
        console.log("Input:" + req.body);

        // Check if the email is already in use
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

            // Create a new user
            let newUser = {
                email: email,
                password: hash,
            };

            // Save user to database
            userDB.insertOne(newUser);
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
        // Extract email and password from the req.body object
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

module.exports = router;
// export default usersRouter;