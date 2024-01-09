const { User, Thought } = require("../models");
const totalUsers = async () => {
    const totalUsers = await User.aggregate().count("userCount");
    return totalUsers;
};

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            const userObj = {
                users,
                userCount: await totalUsers(),
            };
            return res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User
                .findOne({ _id: req.params.userId })
                .select("-__v")
                .lean();

                if(!user) {
                    return res.status(404).json({ message: "No user has been found with that ID." });
                }
                res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const { username, email, thoughts, friends } = req.body;
            const update = {};
            if (username) update.username = username;
            if (email) update.email = email;
            if (thoughts) update.thoughts = thoughts;
            if (friends) update.friends = friends;
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                update,
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.userId,
            });

            if (!user) {
                return res.status(404).json({ message: "No such user has been found." });
            }

            const thoughts = await Thought.deleteMany({
                username: req.params.userId,
            });

            if (thoughts.deletedCount === 0) {
                return res.status(404).json({
                    message: "Thoughtless user deleted.",
                });
            }

            res.json({ message: "Thoughtful user deleted." });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            // console.log("Adding friend now.");
            console.log(req.body);
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                {runValidators: true, new: true}
            );

            if (!friend) {
                return res
                    .status(404)
                        .json({ message: "No user has been found with that ID. :(" });
            }
            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};