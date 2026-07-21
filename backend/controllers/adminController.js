const User = require('../models/UserModel')
const getAllPlayers = async (req, res) => {
    try {
        const players = await User.find({ role: "user" }).sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            count: players.length,
            players
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const deletePlayer = async (req, res) => {
    try {
        const { id } = req.params
        const player=await User.findByIdAndDelete(id)
        if(!player){
            return res.status(404).json({
                message:"Player not found"
            })
        }
        return res.status(200).json({
            message:"Player deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getAllPlayers, deletePlayer }