const {Schema, model, Types} = require("mongoose");

const syntaxOutputSchema = new Schema({
    id: {type: Types.ObjectId, unique: true},
    tokens: [String],
    syntaxMatrix: [[Number]]
});

module.exports = model("SyntaxOutput", syntaxOutputSchema);