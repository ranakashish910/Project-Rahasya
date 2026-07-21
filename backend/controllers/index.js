const {signup,login}=require('./authController')
const {saveGame, loadGame}=require('./gameController')
const {getAllPlayers,deletePlayer}=require('./adminController')

module.exports={signup,login,saveGame,loadGame,getAllPlayers,deletePlayer}