const express=require('express')
const app=express();
const cors=require('cors');
require('dotenv').config();
const connectDb=require('./config')

app.use(cors());
app.use(express.json())
connectDb();

const {authRoutes,gameRoutes,adminRoutes}=require('./routes')
app.use('/api/auth',authRoutes)
app.use("/api/game",gameRoutes)

app.use('/api/admin',adminRoutes)


app.listen(3000,'0.0.0.0',()=>{
    console.log('listening on port 3000')
})