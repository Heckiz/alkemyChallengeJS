module.exports = (sequelize, type)=>{
    const Movements = sequelize.define('movements', {
        id: {
            type: type.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        concept:{
            type: type.STRING(50),
            allowNull: false
        },
        amount:{
            type: type.INTEGER,
            allowNull: false
        },
        type:{
            type: type.STRING,
            allowNull: false
        },
        userId:{
            type: type.INTEGER,
            allowNull:false
        }
     
    },
    {
        timestamps: true
    })

    return Movements;
}