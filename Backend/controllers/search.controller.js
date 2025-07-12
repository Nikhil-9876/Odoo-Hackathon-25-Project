import { User } from '../models/user.models.js';

export const searchUsers = (req, res) => {
    User.find({}, { password: 0 }).then(users => res.json({ users })).catch(err => res.status(500).json({ error: "Internal server error" }));

}