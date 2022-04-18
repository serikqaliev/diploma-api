const {Schema, model} = require("mongoose");

const semanticOutputSchema = new Schema({
    tokens: [String],
    semanticTags: [String]
});

module.exports = model("SemanticOutput", semanticOutputSchema);