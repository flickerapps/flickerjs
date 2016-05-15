const flicker = require('../');
const bodyParser = require('body-parser');
const compress = require('compression');
const logger = require('morgan');
let app = flicker();

app
    .add(compress())
    .add(bodyParser.json())
    .add(bodyParser.urlencoded({ extended: true }))
    .add(logger('dev'));

let api = app.Router();

app.locals.todos = [
    { descripcion: "Lorem 0" },
    { descripcion: "Lorem 1" },
    { descripcion: "Lorem 2" },
    { descripcion: "Lorem 3" },
    { descripcion: "Lorem 4" },
    { descripcion: "Lorem 5" }
];

api
    .add({
        url:'/todos',
        method: 'GET',
        handler: (req,res,next) => { /* retorna los todos */
            res.json(app.locals.todos);
        }
    })
    .add({
        url: '/todos/:todo',
        method: 'GET',
        handler: (req,res,next) => { /*  retorna un todo */
            if(req.params.todo >= app.locals.todos.length){
                next();
            }
            else{
                res.json(app.locals.todos[req.params.todo]);
            }
        }
    })
    .add({
        url: '/todos',
        method: 'POST',
        handler: (req,res,next) => { /*  inserta un todo */
            app.locals.todos.push(req.body.todo);
            res.json(app.locals.todos)
        }
    })
    .add({
        url:'/todos/:todo',
        method: 'DELETE',
        handler: (req,res,next) => { /*  borra un todo */
            if(req.params.todo >= app.locals.todos.length){
                next();
            }
            else{
                app.locals.todos.splice(req.params.todo,1);
                res.json(app.locals.todos);
            }
        }
    })
    .add({
        url: '/todos/:todo',
        method: 'PUT',
        handler: (req,res,next) => { /*  edita un todo */
            if(req.params.todo >= app.locals.todos.length){
                next();
            }
            else{
                app.locals.todos[req.params.todo] = req.body.todo;
                res.json(app.locals.todos)
            }
        }
    })

app
    .add({
        url: '/api',
        handler: api /* lo incluimos en el router */
    })
    .add({
        url: '/',
        handler: (req,res,next) => {
            res.redirect("/api/todos");
        }
    })
    .add((req,res,next) => {
        res.json({}); // returnorna un json vacio
    })
    .listen(3000); /* escuchar en el puerto 3000 */
