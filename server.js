const express = require('express')
const path = require('path')
const cors = require('cors')
const config = require('config')
const PORT = process.env.PORT||config.get('port');
require('dotenv').config()
const authRouter = require('./DAL/Routs/user.routs')
const customerRouter = require('./DAL/Routs/customer.routs')
const calcRouter = require('./DAL/Routs/calculation.routs')
const orderRouter = require('./DAL/Routs/order.routs')
const supportRouter=require('./DAL/Routs/support.routs')
const betonRouter=require('./DAL/Routs/beton.routs')
const mainRouter=require('./DAL/Routs/main.routs')
const stoneRouter=require('./DAL/Routs/stone.routs')

const db = require('./models');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));
app.use('/auth',authRouter);
app.use('/customer',customerRouter);
app.use('/calc',calcRouter);
app.use('/order',orderRouter);
app.use('/support',supportRouter);
app.use('/beton',betonRouter);
app.use('/main',mainRouter)
app.use('/stone',stoneRouter)

db.sequelize.sync().then((req)=>{
    app.listen(PORT,()=>{
        console.log('server run');

    });
});
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client/build/index.html'))
})
