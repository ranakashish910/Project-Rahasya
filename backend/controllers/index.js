const {signup,login}=require('./authController')
const {saveGame, loadGame}=require('./gameController')
module.exports={signup,login,saveGame,loadGame}