const {Schema, model, mongoose} = require("mongoose");

const tokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String, required: true}
}
);

module.exports = model('TokenSchema', tokenSchema);