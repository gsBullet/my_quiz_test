const express = require("express");
const server = express();
const port = 5000;

server.get('/', (req,res,next)=>{
    res.send('Hello from express');
})

server.listen(port, ()=>{
    console.log(`servere is running on http://127.0.0.1:${port}`);
})