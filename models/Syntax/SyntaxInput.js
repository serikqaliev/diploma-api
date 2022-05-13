const {Schema, model, mongoose} = require("mongoose");
const autoIncrementSyntaxInput = require("mongoose-sequence")(mongoose);

const syntaxInputSchema = new Schema({
    sentence: {type: String, required: true},
    processing: {type: Boolean, default: false},
    processed: {type: Boolean, default: false},
}, {_id: false});

syntaxInputSchema.plugin(autoIncrementSyntaxInput, {id: 'syntax_input_id', inc_field: '_id'});
module.exports = model("SyntaxInput", syntaxInputSchema);
