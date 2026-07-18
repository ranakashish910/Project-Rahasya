const express=require('express')
const router=express.Router()
const {saveGame,loadGame}=require('../controllers')
const {authMiddleware}=require('../middleware')

router.post("/save",authMiddleware,saveGame)
router.get("/load",authMiddleware,loadGame)


module.exports=router