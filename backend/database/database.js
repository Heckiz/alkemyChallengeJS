const Sequelize = require('sequelize');
const MovementModel = require('../models/Movement')
const UserModel = require('../models/User')

const sequelize = new Sequelize(process.env.MYSQL_URI)

const Movement = MovementModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

async function sync() {

    try {
        await sequelize.sync({force:false});
        console.log("Models synced successfully");
    } catch (error) {
        console.log("Models not sync | ERROR |", error);
    }
}
sync()

module.exports = {
    Movement,
    User
}