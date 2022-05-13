const {Schema, model, mongoose} = require("mongoose");
const autoIncrementSemantic = require("mongoose-sequence")(mongoose);

const semanticInputSchema = new Schema({
    sentence: {type: String, required: true},
    processing: {type: Boolean, default: false},
    processed: {type: Boolean, default: false},
}, {_id: false});

semanticInputSchema.plugin(autoIncrementSemantic, {id: 'semantic_input_id', inc_field: '_id'});
module.exports = model("SemanticInput", semanticInputSchema);
