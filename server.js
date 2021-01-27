const express = require('express');
const app = express();



app.use(express.static('public'))




const port = process.env.PORT || 8080;
app.listen(port, () => console.log('http://localhost:8080/login/login.html'))

