const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const routes = require("./routes");

const app = express();

const jwt = require('jsonwebtoken');
const payload ={foo : 'bar'};
const secretKey = "mySecretKey";
const jwtToken = jwt.sign(payload, secretKey);

const decoded = jwt.verify(jwtToken, secretKey);
console.log(decoded);


app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const port = process.env.PORT 

const start = async() => {
    try{
        server.listen(port, () => {
            console.log(`Server is listening on ${port}`);
        })
    }catch(err){
        console.error(err);
    }
}

start();





