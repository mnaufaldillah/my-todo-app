const { where } = require("sequelize");
const { Todo, User } = require(`../models/index.js`);

class TodoController {
    static async createTodo(req, res, next) {
        try {
            const { todo } = req.body;

            const newTodo = await Todo.create({
                todo,
                isCompleted: false,
                userId: req.user
            });

            res.status(201).json(newTodo);
        } catch (error) {
            next(error)
        }
    }

    static async getTodos(req, res, next) {
        try {
            const todos = await Todo.findAll({
                where: {
                    userId: req.user
                }
            });

            res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    static async patchTodoByIdCompleted(req, res, next) {
        try {
            const { todoId } = req.params;

            await Todo.update({
                isCompleted: true,
            }, {
                where: {
                    id: todoId
                },
            });

            res.status(200).json({ message: `Status todo ID ${todoId} is changed to complete`});
        } catch (error) {
            next(error)
        }
    }

    static async patchTodoByIdUncompleted(req, res, next) {
        try {
            const { todoId } = req.params;

            await Todo.update({
                isCompleted: false,
            }, {
                where: {
                    id: todoId
                },
            });

            res.status(200).json({ message: `Status todo ID ${todoId} is changed to uncomplete`});
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodoById(req, res, next) {
        try {
            const { todoId } = req.params;

            await Todo.destroy({
                where: {
                    id: todoId
                }
            });

            res.status(200).json({ message: `Todo ID ${todoId} has been deleted`});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodoController;