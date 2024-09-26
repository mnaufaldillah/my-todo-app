const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const router = require(`express`).Router();
const routerTodo = require(`./todos`)

router.post(`/login`, UserController.loginUser);
router.post(`/register`, UserController.registerUser);

router.use(authentication);

router.use(`/todos`, routerTodo)

module.exports = router;