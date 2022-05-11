const {Schema, model, Types, mongoose} = require("mongoose");
const autoIncrementSyntax = require("mongoose-sequence")(mongoose);

const syntaxOutputSchema = new Schema({
    _id: Number,
    tokens: [String],
    syntaxMatrix: [[Number]]
},
    { _id: false }
);

syntaxOutputSchema.plugin(autoIncrementSyntax, {id: 'syntax_id', inc_field: '_id'});
module.exports = model("SyntaxOutput", syntaxOutputSchema);