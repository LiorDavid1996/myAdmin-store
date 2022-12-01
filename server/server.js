const express =require('express')
const app = express()
const port = 8080
const cors = require('cors')
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`server is ${port}`);
  });
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }