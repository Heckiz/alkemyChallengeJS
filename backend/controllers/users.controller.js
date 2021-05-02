const { User } = require('../database/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
userCtrl = {}

userCtrl.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
            password = bcrypt.hashSync(password, 10);
            await User.create({
                username,
                email,
                password
            });
            res.json({message: "Register complete!"})
        
    } catch (e) {
        console.log(e)
        res.status(404).send('There was a problem registering your user');
    }
};


userCtrl.signin = async (req, res) => {
    const user = await User.findOne({where:{ email: req.body.email }})
    if (!user) {
        return res.status(404).send("The email doesn't exists")
    }
    const confirmPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!confirmPassword) {
        return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign(
        { id: user.id },
        process.env.secret,
        { expiresIn: 60 * 60 * 24 }
    );

    res.status(200).json({ id: user._id, username: user.username, auth: true, token });

};

userCtrl.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
};
module.exports = userCtrl;