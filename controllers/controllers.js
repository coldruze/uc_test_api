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

            res.cookie("token", userData.token, {maxAge: 600000, httpOnly: true});
            return res.json(userData.token);

        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при регистрации"});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);

            res.cookie("token", userData.token, {maxAge: 600000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при авторизации"});
        }
    }

    async getUser(req, res) {
        try {
            const {token} = req.cookies;
            res.cookie("token", token, {maxAge: 600000, httpOnly: true});

            const data = await UserService.getUser(token);
            if (!data) {
                return res.status(400).json({message: "Ошибка при получении данных пользователя", errors});
            }
            return res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при получении данных пользователя"});
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("token");
            res.status(200).json({message: "Успешный выход с аккаунта"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при выходе с аккаунта"});
        }
    }
}

module.exports = new Controller;