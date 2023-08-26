const express = require("express");
const bodyParser = require('body-parser');
const server = express();
const fs = require('fs');
const read_json = require('./database/read_json');
const write_json = require('./database/write_json');
const { title } = require("process");
const { log } = require("console");
const port = 5000;



server.set('view engine', 'ejs');
server.set('views', './views');
server.set('json spaces', 2)
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({
    extended: false
}))

server.use(express.static('public'));


server.get('/', (req, res, next) => {
    const filePath = './database/todo.json';
    let todo_list = read_json(filePath);
    res.render('frontend/index.ejs', {
        todo_list
    });
})
server.get('/edit/:index', (req, res, next) => {
    const filePath = './database/todo.json';
    let todo_list = read_json(filePath);
    // console.log(req.params.index);
    // console.log(todo_list);
    let item = todo_list[req.params.index];
    if(item){
        res.render('frontend/edit.ejs',{
            todo: item,
            index: req.params.index
        });

    }
    else{
        res.send('404 not found');
    }
    
})
server.get('/delete/:index',(req,res)=>{
    const filePath = './database/todo.json';
    let todo_list = read_json(filePath);
    let item = todo_list[req.params.index];
    if(item){
        todo_list.splice(req.params.index,1);
        write_json(filePath, todo_list);
        return res.redirect('/')
    }
    else{
        res.send('not deleted')
    }
    console.log(todo_list);



})
server.post('/update-form-info',(req,res)=>{
    const filePath = './database/todo.json';
    let todo_list = read_json(filePath);
    let item = todo_list[req.body.index];
    console.log(item);
    if(item){
        item.title= req.body.todo_title;
        write_json(filePath, todo_list);

        return res.redirect('/');
    }
    else{
        res.send('todo list not updated');
    }
})

server.post('/form-info', (req, res, next) => {
   
    const {
        todo_title
    } = req.body;
    const filePath = './database/todo.json';
    let todo_list = read_json(filePath);
    todo_list.push({
        title: todo_title,
        is_position: 0
    });
    write_json(filePath, todo_list);

    // console.log(todo_list);
    // res.send(JSON.stringify(todo_list));
    // res.status(200).json(todo_list);
    res.redirect('/');


})




server.listen(port, () => {
    console.log(`servere is running on http://127.0.0.1:${port}`);
})