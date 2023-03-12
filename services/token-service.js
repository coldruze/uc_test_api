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

    validateAccessToken(token) {
        try {
            const data = jwt.verify(token, access_secret);
            return data;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const data = jwt.verify(token, refresh_secret);
            return data;
        } catch (error) {
            return null;
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

    async removeToken(refreshToken) {
        await tokenModel.deleteOne({refreshToken});
    }

    async findToken(token) {
        const data = await tokenModel.find({refreshToken: token});
        return data;
    }
}

module.exports = new TokenService;