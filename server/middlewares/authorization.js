const { where } = require("sequelize");
const { Todo } = require(`../models/index.js`);

async function authorization(req, res, next) {
    try {
        const { todoId } = req.params;

        const foundTodo = await Todo.findByPk(todoId);

        if(!foundTodo) {
            throw { name: `NotFound` }
        }

        if(foundTodo.userId !== req.user) {
            throw { name: `Forbidden` }
        }

        next()
    } catch (error) {
        next(error);
    }
}

module.exports = authorization