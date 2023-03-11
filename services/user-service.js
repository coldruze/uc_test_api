const UserModel = require("../models/user"),
      bcrypt = require("bcryptjs"),
      TokenService = require("../services/token-service"),
      UserDto = require("../dto/userDto"),
      CustomException = require("../exception/customException")


class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw new CustomException(email, "Пользователь с такой почтой уже зарегистрирован");
        }

        const hashPassword = bcrypt.hashSync(password, 3);
        const user = await UserModel.create({email, password: hashPassword});

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...UserDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens};
    }

    async login(email, password) {
        
    }

    async getUser(email) {
        
    }

    async getLatency(req, res) {
        
    }

    async logout(req, res) {
        
    }
}

module.exports = new UserService();