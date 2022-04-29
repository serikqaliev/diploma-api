const jwt = require("jsonwebtoken");
const tokenModel = require("../models/Token")
const config = require("config");

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET || config.get("jwtAccessSecret");
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || config.get("jwtRefreshSecret");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, jwtAccessSecret, {expiresIn: "1d"});
        const refreshToken = jwt.sign(payload, jwtRefreshSecret, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, jwtAccessSecret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, jwtRefreshSecret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();