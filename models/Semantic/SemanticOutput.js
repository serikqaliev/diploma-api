const {Schema, model, mongoose} = require("mongoose");
const autoIncrementSemantic = require("mongoose-sequence")(mongoose);

const semanticOutputSchema = new Schema({
    _id: Number,
    tokens: [String],
    semanticTags: [String]
},
    {_id: false}
);

semanticOutputSchema.plugin(autoIncrementSemantic, {id: 'semantic_id', inc_field: '_id'});
module.exports = model("SemanticOutput", semanticOutputSchema);