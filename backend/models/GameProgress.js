const mongoose = require("mongoose");

const gameProgressSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    currentChapter: {
        type: Number,
        default: 1
    },

    hasKey: {
        type: Boolean,
        default: false
    },

    puzzleSolved: {
        type: Boolean,
        default: false
    },

    inventory: {
        type: [String],
        default: []
    },

    clues: {
        type: [String],
        default: []
    },

    timer: {
        type: Number,
        default: 300
    },
    diaryRead: {
        type: Boolean,
        default: false
    },

    paintingInspected: {
        type: Boolean,
        default: false
    },

    showKey: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model("GameProgress", gameProgressSchema);