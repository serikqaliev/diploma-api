const SyntaxInput = require("../models/Syntax/SyntaxInput");
const SyntaxOutput = require("../models/Syntax/SyntaxOutput");
const ApiError = require("../error/ApiError");

class SyntaxController {
    async create(req, res, next) {
        try {
            const { words, syntaxMatrix, id } = req.body;
            let newMatrix = syntaxMatrix.map((x) => [...x]);
            let sentenceTokens = [...words];
            const syntax = await new SyntaxOutput({
                tokens: sentenceTokens,
                syntaxMatrix: newMatrix,
            });
            const changedSyntax = await SyntaxInput.findById(id);
            changedSyntax.processed = true;
            await changedSyntax.save();
            await syntax.save();
            res.status(201).json( syntax );
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const syntaxes = await SyntaxInput.find({ processing: false });
            res.json(syntaxes);
        } catch (e) {
            next(ApiError.badRequest("Что-то пошло не так, попробуйте снова"));
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            const syntax = await SyntaxInput.findById(id);
            syntax.processing = true;
            res.json(syntax);
            await syntax.save();
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так, попробуйте снова"));
        }
    }
}

module.exports = new SyntaxController();