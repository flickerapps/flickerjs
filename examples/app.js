const flicker = require('../');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const logger = require('morgan');
let app = flicker();
let fooRouter = app.Router();
let barRouter = require('./routers/bar.js'); // archivo de router externo

app.set('template','pug')
    .set('static dir',__dirname + '/public')
    .set('views dir',__dirname + '/views')
//  .add('env','production');
    .add(compress())
    .add(logger('dev'))
//  .add(favicon( __dirname + '/public/favicon.ico'))
    .add(app.serveStatic())
    .add(bodyParser.json())
    .add(bodyParser.urlencoded({ extended: true }))
    .add(cookieParser());


// heredado en las vistas
app.locals.year = 2016;

app
    .add(
        (req,res,next) => {
            // heredado en las vistas
            res.locals.author = "Flicker.js";
            next();
        }
    );


fooRouter
    .add({
        url: '/',
        method: 'GET',
        handler: (req,res,next) => {
            res.render('index',{title: 'Bienvenido a Flicker.js', message: 'Hola, Soy ' + req.url});
        }
    })
    .add({
        url: '/bar',
        method: 'GET',
        handler: (req,res,next) => {
            res.render('index',{title: 'Bienvenido a Flicker.js', message: 'Hola, Soy ' + req.url});
        }
    })

barRouter
    .add({
        url: '/user/:id',
        method: 'GET',
        handler: (req,res,next) => {
            res.send(req.params.id);
        }
    })

fooRouter
    .add({
        url: '/bar2',
        handler: barRouter
    })
app
    .add({
        url: '/foo',
        handler: fooRouter
    })
    .add({
        url: '/bar',
        handler: barRouter
    })
    .add({
        url: '/',
        handler: (req,res,next) => {
            res.render('index',{title: 'Bienvenido a Flicker.js'});
        }
    })
    .add({
        url: '/test',
        handler: (req,res,next) => {
            res.render('index',{title: 'Bienvenido a Flicker.js', message: 'Hola, Soy ' + req.url});
        }
    })

    .add({
        url: '/blog',
        handler: (req,res,next) => {
            res.render('index',{title: 'Bienvenido a Flicker.js', message: 'Hola, Soy ' + req.url});
        }
    })
    .add({
        url: '/user/:id',
        handler: (req,res,next) => {
            res.send(req.params.id);
        }
    })



    .add({
        handler:[
            (req,res,next) => {
                var err = new Error('No encontrado');
                err.status = 404;
                next(err);
            },
            (req,res,next,err) => {
                if(app.get('env') == 'production'){
                    err.stack = "";
                }
                res.status(err.status || 500).render("err",{ title: err.message, error: err});
            }
        ]
    })
    .listen(3000, () => {
        console.log('Corriendo...');
    });
