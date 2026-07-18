const { GameProgress } = require("../models");

const saveGame = async (req, res) => {

    try {
        const userId = req.user.id;

        const progress = await GameProgress.findOneAndUpdate(
            { userId },
            {
                currentChapter: req.body.currentChapter,
                hasKey: req.body.hasKey,
                puzzleSolved: req.body.puzzleSolved,
                inventory: req.body.inventory,
                clues: req.body.clues,
                timer: req.body.timer,
                diaryRead: req.body.diaryRead,
                paintingInspected: req.body.paintingInspected,
                showKey: req.body.showKey,
            },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: "Game Saved", progress });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

const loadGame = async (req, res) => {
    try {
        const userId = req.user.id;
        const progress = await GameProgress.findOne({ userId });
        if (!progress) {
            return res.status(404).json({ message: "No saved game" });
        }
        res.status(200).json(progress);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { saveGame, loadGame };