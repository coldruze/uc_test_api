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
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при авторизации"});
        }
    }

    async getUser(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const data = await UserService.getUser(refreshToken);
            if (!data) {
                return res.status(400).json({message: "Ошибка при получении данных пользователя", errors});
            }
            return res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при получении данных пользователя"});
        }
    }

    async getLatency(req, res) {
        try {
            const {refreshToken} = req.cookies;
            await UserService.getLatency(refreshToken);
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при получении задержки"});
        }
    }

    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.status(200).json({message: "Успешный выход с аккаунта"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Ошибка при выходе с аккаунта"});
        }
    }
}

module.exports = new Controller;