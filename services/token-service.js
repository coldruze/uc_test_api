const jwt = require("jsonwebtoken"),
      {secret} = require("../config.json"),
      tokenModel = require("../models/token")


class TokenService {
    generateTokens(payload) {
        const token = jwt.sign(payload, secret, {expiresIn: "600000"});
        return {
            token
        }
    }

    validateToken(token) {
        try {
            const data = jwt.verify(token, secret);
            return data;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, token) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.token = token;
            // return tokenData.save();
            tokenData.save();
        }
        await tokenModel.create({user: userId, token});
        // const accessToken = await tokenModel.create({user: userId, token});
        // return accessToken;
    }

    async removeToken(token) {
        await tokenModel.deleteOne({token});
    }

    async findToken(token) {
        const data = await tokenModel.find({token: token});
        return data;
    }
}

module.exports = new TokenService;