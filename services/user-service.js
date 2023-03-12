const UserModel = require("../models/user"),
      TokenModel = require("../models/token"),
      bcrypt = require("bcryptjs"),
      TokenService = require("../services/token-service"),
      UserDto = require("../dto/userDto"),
      CustomException = require("../exception/customException")


class UserService {
    async createTokens(userDto) {
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens};
    }

    async registration(email, password) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw new CustomException(email, "Пользователь с такой почтой уже зарегистрирован");
        }

        const hashPassword = bcrypt.hashSync(password, 3);
        const user = await UserModel.create({email, password: hashPassword});

        const userDto = new UserDto(user);
        const tokens = this.createTokens(userDto);

        return tokens;
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw new CustomException(email, "Пользователя с такой почтой нет");
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new CustomException("Введен неверный пароль");
        }

        const token = await TokenModel.findOne({user: user._id});

        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new CustomException("Пользователь не авторизован");
        }

        const data = TokenService.validateRefreshToken(refreshToken);
        const foundToken = await TokenService.findToken(refreshToken);
        if (!data || !foundToken) {
            throw new CustomException("Ошибка");
        }
        
        const user = await UserModel.findOne({_id: foundToken[0].user});
        const userDto = new UserDto(user);
        const tokens = this.createTokens(userDto);

        return userDto;
    }

    async getUser(refreshToken) {
        const userDto = await this.refresh(refreshToken);
        return userDto.email;
    }

    async getLatency(refreshToken) {

        await this.refresh(refreshToken);
    }

    async logout(refreshToken) {
        await TokenService.removeToken(refreshToken);
    }
}

module.exports = new UserService;