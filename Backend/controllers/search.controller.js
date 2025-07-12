import {User} from '../models/user.models.js';

export const searchUsers = (req, res) => {
    // User.find({}, { password: 0 }).exec((err, users) => {
    //     if (err) {
    //         return res.status(500).json({ error: "Internal server error" });
    //     }
    //     res.json({ users });
    // });
    User.find({}, { password: 0 }).then(users => res.json({ users })).catch(err => res.status(500).json({ error: "Internal server error" }));
    // res.json({
    //     users
    // })
    // wantskills = req.query.skills;
    // haveskills = req.query.haveskills;
    // users = [];
    // for (const user of User.find()) {
    //     if (user.offeredskills.includes(wantskills) && user.wantskills.includes(haveskills)) {
    //         users.push(user);
    //     }
    // }
    // return res.json(users);
}