const catchError = require('../utils/catchError');
const User = require('../models/User');
const { password } = require('pg/lib/defaults');
// getAll para traer 
const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users)
});
// create para crear
const create = catchError(async (req, res) => {
    const {first_name, last_name, email, password, birthday} = req.body;
    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        birthday
    });
    return res.status(201).json(user)
});
//Crear un usuario de acuerdo a su id
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    return res.json(user);
})
// Remove, elimina de acuerdo al id
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({where: { id }});
    return res.sendStatus(204);
})
//update, actualiza dependiendo del id
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const {first_name, last_name, email, password, birthday} = req.body;
    const user = await User.update(
        { first_name, last_name, email, password, birthday },
        { where: { id }, returning: true}
    )
    return res.json(user);
})



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}