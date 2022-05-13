const {Schema, model, mongoose} = require("mongoose");

const semanticInputSchema = new Schema({
    sentence: {type: String, required: true},
    processing: {type: Boolean, default: false},
    processed: {type: Boolean, default: false},
});

module.exports = model("SemanticInput", semanticInputSchema);
