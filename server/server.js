const dotenv = require('dotenv')
dotenv.config()
const express =require('express')
const app = express()
const port = 8080
const cors = require('cors')
const productRouter = require('./router/productRouter')
const orderRouter = require('./router/orderRouter')
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const db=require('./DB')

app.use('/product',productRouter)
app.use('/orders',orderRouter)

app.get('/', (req, res) => {
  res.send({ massage: "success" })
})



app.listen(port, () => {
    console.log(`server is ${port}`);
  });
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }