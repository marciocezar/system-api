const User = require('../models/user');

exports.listUsers = async (req, res) => {
    try {
        console.log('1');
        const users = await User.findAll({
            attributes: ['username', 'loginuser', 'active'],
        });
        console.log(users);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.json(users);
    } catch (error) {
        console.log('1');
        console.log(error);
        res.status(500).send(error.message);
    }
};