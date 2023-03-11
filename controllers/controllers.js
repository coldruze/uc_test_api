const UserService = require("../services/user-service"),
      {validationResult} = require("express-validator")


class Controller {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }

            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData.accessToken);

        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при регистрации"});
        }
    }

    async login(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

    async getUser(req, res) {
        try {
            const data = await User.find();
            const users =[];
            for (let user of data) {
                users.push(user.email);
            }
            return res.send(users);
        } catch (error) {
            console.log(error);
        }
    }

    async getLatency(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

    async logout(req, res) {
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = new Controller();