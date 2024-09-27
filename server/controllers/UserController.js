const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt.js");
const { User } = require(`../models/index.js`);

class UserController {
    static async registerUser(req, res, next) {
        try {
            const { email, password } = req.body;

            const newUser = await User.create({
                email,
                password: hashPassword(password)
            });

            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;

            if(!email || !password ) {
                throw { name: `CredentialsRequired`, message: `Email and Password is Required`};
            }

            const foundUser = await User.findOne({
                where: {
                    email
                }
            });

            if(!foundUser) {
                throw { name: `Unauthorized`, message: `Email or Password is Invalid`};
            }

            const comparedPass = comparePassword(password, foundUser.password);

            if(!comparedPass) {
                throw { name: `Unauthorized`, message: `Email or Password is Invalid`};
            }

            const access_token = signToken({id: foundUser.id});

            res.status(200).json({ access_token });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;