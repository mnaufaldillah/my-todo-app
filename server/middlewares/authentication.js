const { verifyToken } = require("../helpers/jwt.js");
const { User } = require(`../models/index.js`);


async function  authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization;

        if(!access_token) {
            throw { name: `Unauthenticated` }
        }

        const [type, token] = access_token.split(` `);

        if(type !== `Bearer`) {
            throw { name: `Unauthenticated` }
        }

        const verify = verifyToken(token);

        const foundUser = await User.findByPk(verify.id);

        if(!foundUser) {
            throw { name: `Unauthenticated` }
        }

        req.user = foundUser.id;
        req.userEmail = foundUser.email;

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = authentication;