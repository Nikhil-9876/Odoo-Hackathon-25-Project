import {User} from "../models/user.models.js";
export const getProfile = (req, res) => {
    const usernameToFind = req.params.username;
    User.findOne({username: usernameToFind})
        .then(user => {
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            return res.json(user);
        })
        .catch(err => res.status(500).json({error: err.message}));
};
export const updateProfile = (req, res) => {
    const usernameToUpdate = req.params.username;
    const {email, skillOffered, skillWanted} = req.body;

    User.findOneAndUpdate(
        {username: usernameToUpdate},
        {email, skillOffered, skillWanted, updatedAt: new Date()},
        {new: true}
    )
    .then(updatedUser => {
        if (!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }
        return res.json(updatedUser);
    })
    .catch(err => res.status(500).json({error: err.message}));
};