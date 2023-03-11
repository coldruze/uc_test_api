const jwt = require("jsonwebtoken"),
      {access_secret, refresh_secret} = require("../config.json"),
      tokenModel = require("../models/token")


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, access_secret, {expiresIn: "600000"});
        const refreshToken = jwt.sign(payload, refresh_secret, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }
}

module.exports = new TokenService();