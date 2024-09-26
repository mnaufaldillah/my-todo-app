const TodoController = require("../controllers/TodoController");
const authorization = require("../middlewares/authorization");
const router = require(`express`).Router();

router.post(`/`, TodoController.createTodo);
router.get(`/`, TodoController.getTodos);
router.delete(`/:todoId`, authorization, TodoController.deleteTodoById);
router.patch(`/:todoId/complete`, authorization, TodoController.patchTodoByIdCompleted);
router.patch(`/:todoId/uncomplete`, authorization, TodoController.patchTodoByIdUncompleted);

module.exports = router;