// Create new thoughts, find the user with the same username, and add the new thought's id to the user's array of thoughts.

const { User, Thought } = require("../models");
const totalThoughts = async () => {
    const totalThoughts = await Thought.aggregate().count("thoughtCount");
    return totalThoughts;
};

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            const thoughtObj = {
                thoughts,
                thoughtCount: await totalThoughts(),
            };
            return res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought
                .findOne({ _id: req.params.thoughtId })
                .select("-__v")
                .lean();

            if (!thought) {
                return res.status(404).json({ message: "There is no thought with that ID." });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            // console.log("When you when you creating a thought");
            console.log(req.body);
            const thought = await Thought.create(req.body);

            const updatedUser = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                    return res
                        .status(404)
                        .json({ message: "The thought was created but the user could not be found." });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const { thoughtText, createdAt, username, reactions } = req.body;
        
            const update = {};
                if (thoughtText) update.thoughtText = thoughtText;
                if (createdAt) update.createdAt = createdAt;
                if (username) update.username = username;
                if (reactions) update.reactions = reactions;
        
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                update,
                { new: true }
            );
            
            if (!updatedThought) {
                return res.status(404).json({ message: 'The thought has not been found.' });
            }
            return res.json(updatedThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughtDeleted = await Thought.findOneAndDelete({
                _id: req.params.thoughtId,
            });

            if (!thoughtDeleted) {
                return res.status(404).json({ message: "The thought doesn't exist." });
            }

            const user = await User.findOneAndUpdate(
                { username: thoughtDeleted.username },
                { $pull: { thoughts: req.params.thoughtId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "A user has not been found with that ID. :(" });
            }
            res.json({ message: "The thought has been successfully deleted." });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            // console.log("You are currently adding a reaction");
            console.log(req.body);
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res
                    .status(404)
                    .json({ message: "No thought has been found with that ID. :(" });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res
                    .status(404)
                    .json({ message: "No reaction has been found with that ID :(" });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};