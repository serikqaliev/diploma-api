const SemanticOutput = require("../models/Semantic/SemanticOutput");
const SemanticInput = require("../models/Semantic/SemanticInput");
const ApiError = require("../error/ApiError")

function bies(mas) {
    let newMas = [...mas];

    for(let i = 0; i < mas.length; i++) {
        if( i === 0 ) {
            if(mas[i] === mas[i + 1]) { //1
                newMas[i] = "B-" + mas[i];
            } else if (mas[i] !== mas[i+1]) { //0
                newMas[i] = "S-" + mas[i];
            }
        } else if ( i !== 0 && i !== (mas.length - 1) ) {
            if(mas[i-1] !== mas[i] && mas[i] === mas[i+1]) { //1
                newMas[i] = "B-" + mas[i];
            } else if (mas[i-1] !== mas[i] && mas[i] !== mas[i+1]) {
                newMas[i] = "S-" + mas[i];
            } else if ( mas[i-1] === mas[i] && mas[i] === mas[i+1] ) {
                newMas[i] = "I-" + mas[i];
            } else if (mas[i-1] === mas[i] && mas[i] !== mas[i+1]) {
                newMas[i] = "E-" + mas[i];
            }
        } else if ( i === (mas.length - 1) ) {
            if (mas[i-1] === mas[i]) {
                newMas[i] = "E-" + mas[i];
            } else if (mas[i-1] !== mas[i]) {
                newMas[i] = "S-" + mas[i];
            }
        }
    }
    return newMas;
}

class SemanticController {
    async create(req, res, next) {
        try {
            const { words, semanticTags, id } = req.body;
            let newMatrix = bies([...semanticTags]);
            let sentence = [...words];
            const semantic = await new SemanticOutput({
                tokens: sentence,
                semanticTags: newMatrix,
            });
            const changedSemantic = await SemanticInput.findById(id);
            changedSemantic.processed = true;
            await changedSemantic.save();
            await semantic.save();
            res.status(201).json({ message: "Успешно отправлено" });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const semantics = await SemanticInput.find({ processing: false });
            res.json(semantics);
        } catch (e) {
            next(ApiError.internal("Что-то пошло не так, попробуйте снова"));
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            console.log(id)
            const semantic = await SemanticInput.findById(id);
            semantic.processing = true;
            res.json(semantic);
            await semantic.save();
        } catch (e) {
            next(ApiError.internal("Что-то пошло не так, попробуйте снова"));
        }
    }
}

module.exports = new SemanticController();