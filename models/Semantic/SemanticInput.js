const {Schema, model} = require("mongoose");

const semanticInputSchema = new Schema({
    sentence: {type: String, required: true},
    processing: {type: Boolean, default: false},
    processed: {type: Boolean, default: false},
    processingTime: {type: Date}
});

module.exports = model("SemanticInput", semanticInputSchema);