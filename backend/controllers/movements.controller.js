const movementsCtl= {};

const {Movement} = require('../database/database')
const sequelize =require('sequelize')
movementsCtl.getMovements=  async (req, res) =>{
    const pageAsNumber = Number.parseInt(req.query.page);
    const offsetAsNumber = Number.parseInt(req.query.offset);
    let page=0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber>0) {
        page = pageAsNumber;
    }
    let offset=10;
    if (!Number.isNaN(offsetAsNumber) && offsetAsNumber>0) {
        offset = offsetAsNumber;
    }
    const movements = await Movement.findAndCountAll({
        where:{userId:req.userId},
        limit: offset,
        offset: page * offset,
        order: sequelize.literal('id DESC')
    });
    res.json(movements);
};

movementsCtl.newMovement = async (req, res) =>{
    const {concept, amount, date, type} = req.body;
     await Movement.create({
        concept,
        amount,
        date,
        type,
        userId:req.userId
    })
   res.json('movement save')
};


movementsCtl.getMovement= async (req, res) =>{
    const movement = await Movement.findOne({ where: { id: req.params.id }});
    res.status(200).json(movement);
 };


 movementsCtl.deleteMovement= async (req, res) =>{
    const movement = await Movement.findOne({ where: { id: req.params.id }})
    movement.destroy()
    res.send('movement delete')
 };

 movementsCtl.updateMovement= async (req, res) =>{
    const movement =await Movement.findOne({ where: { id: req.params.id }})  
    const {concept, amount } = req.body;
    console.log(req.body)
    await movement.update( {
        concept,
        amount,
    })
   res.json('movement update') };


 module.exports = movementsCtl;