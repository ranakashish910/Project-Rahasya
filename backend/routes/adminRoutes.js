const express=require('express')
const router=express.Router()

const { getAllPlayers,deletePlayer } = require("../controllers");
const {authMiddleware,isAdmin}=require('../middleware')

router.get('/players',authMiddleware,isAdmin,getAllPlayers)
router.delete('/player/:id',authMiddleware,isAdmin,deletePlayer)

module.exports=router