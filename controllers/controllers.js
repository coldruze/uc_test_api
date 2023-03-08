const User = require("../models/user");
const bcrypt = require("bcryptjs");


class Controller {
    async registration(req, res) {
        try {
            const {email, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) return res.status(400).json({message: "Пользователь с такой почтой уже зарегистрирован"});
            const hashPassword = bcrypt.hashSync(password, 3);
            const user = new User({email, password: hashPassword});
            await user.save();
            return res.json({message: "Пользователь успешно зарегистрирован"});
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