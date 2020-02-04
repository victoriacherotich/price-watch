const express = require('express');
const joanna = require('./scrappers/joanna');
const pauline=require('./scrappers/pauline');
const zaron= require('./scrappers/zaron');
const huddah= require('./scrappers/huddah');


const app = express();
const port = 8000;

app.use(express.static('./assets'));

app.get('/', function(req, res){
    const path = __dirname + '/index.html';
    res.sendFile(path);
});

app.get('/joanna', async (req, res) => {
    const item = req.query.q || 'lipstick';
    const joannaRes = await joanna.search(item);
    res.send(joannaRes);
});
app.get('/pauline', async (req, res) => {
    const item = req.query.q || 'lipstick';
    const paulineRes = await pauline.search(item);
    res.send(paulineRes);
});
app.get('/zaron', async (req, res) => {
    const item = req.query.q || 'lipstick';
    const zaronRes = await zaron.search(item);
    res.send(zaronRes);
});
app.get('/huddah', async (req, res) => {
    const item = req.query.q || 'lipstick';
    const huddahRes = await huddah.search(item);
    res.send(huddahRes);
});
app.post('/login', (req, res) => {
})

app.listen(port, function(){
    console.log("The server has started at port: "+port);
})