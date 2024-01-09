const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
    // console.log("connection opened");

    let usersCheck = await connection.db.listCollections
    .listCollections({ name: "users" })
    .toArray();

    let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();

    await Student.collection.insertMany(students);

    const reignsThoughts = [
        {
            thoughtText: "Yo, what it is wit yo?",
            createdAat: Date,
            username: "Reign",
            reactions: [
                {
                    reactionBody: "That be it, son.",
                    username: "Storm",
                    createdAt: Date,
                },
                {
                    reactionBody: "Well I reckon.",
                    username: "Cornicopia",
                    createdAt: Date,
                },
                {
                    reactionBody: "Who said that?!",
                    username: "MosCorel",
                    createdAt: Date,
                },
                {
                    reactionBody: "It's coming",
                    username: "It's almost here",
                    createdAt: Date,
                },
            ]
        },
        {
            thoughtText: "I figured out the quadratic equation",
            createdAat: Date,
            username: "Storm",
            reactions: [
                {
                    reactionBody: "Now try the dodecadratic equation, then get back to me",
                    username: "Reign",
                    createdAt: Date,
                },
                {
                    reactionBody: "Yeah right",
                    username: "Cornicopia",
                    createdAt: Date,
                },
                {
                    reactionBody: "Please tell me more, I need to know",
                    username: "MosCorel",
                    createdAt: Date,
                },
                {
                    reactionBody: "It just made it into the house",
                    username: "It's almost here",
                    createdAt: Date,
                },
            ]
        },
        {
            thoughtText: "Please help me",
            createdAat: Date,
            username: "It's almost here",
            reactions: [
                {
                    reactionBody: "There's no running",
                    username: "Storm",
                    createdAt: Date,
                },
                {
                    reactionBody: "AAAAAAAAAAAAAHHHHHHHHHHHHHHH",
                    username: "Cornicopia",
                    createdAt: Date,
                },
                {
                    reactionBody: "WhA-wHAT WAS that?!",
                    username: "MosCorel",
                    createdAt: Date,
                },
                {
                    reactionBody: "The beginning of the end of the beginning",
                    username: "Reign",
                    createdAt: Date,
                },
            ]
        },
        {
            thoughtText: "Advanced technological capabilities!",
            createdAat: Date,
            username: "MosCorel",
            reactions: [
                {
                    reactionBody: "I don't like your tone.",
                    username: "Reign",
                    createdAt: Date,
                },
                {
                    reactionBody: "Let's agree to disagree",
                    username: "Cornicopia",
                    createdAt: Date,
                },
                {
                    reactionBody: "Oh, there he goes again...",
                    username: "Storm",
                    createdAt: Date,
                },
                {
                    reactionBody: "It's beating on my door and my phone isn't working. please call the police to my address *** ******* ** ************,** *****",
                    username: "It's almost here",
                    createdAt: Date,
                },
            ]
        },
        {
            thoughtText: "Help! I'm smarter than all of you and I don't think y'all will ever reach my level",
            createdAat: Date,
            username: "Cornicopia",
            reactions: [
                {
                    reactionBody: "True",
                    username: "Reign",
                    createdAt: Date,
                },
                {
                    reactionBody: "Fur real, friends",
                    username: "Storm",
                    createdAt: Date,
                },
                {
                    reactionBody: "I don't like to admit it, but I can't deny it either",
                    username: "MosCorel",
                    createdAt: Date,
                },
            ]
        }
    ]
console.table(users);
console.info("Seeds planted! 🌱");
process.exit(0);
});