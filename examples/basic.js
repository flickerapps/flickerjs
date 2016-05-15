const flicker = require('../');
let app = flicker();

app.add(app.serveStatic());
// para ser heredado en las vistas
app.locals.year = 2016;

app
    .add({
        url: '/',
        method: 'GET',
        handler: [
            (req,res,next) => {
                app.locals.author = "Flicker.js 2";
                next();
            },
            (req,res,next) => {
                res.render('index',{title: 'Bienvenido a Flicker.js'});
            }
        ]
    })
    .add({
        url: '/user/:id',
        handler: (req,res,next) => {
            res.send(req.params.id);
        }
    })

    .add({
        url: '/blog/:blog/cat/:cat',
        handler: (req,res,next) => {
            res.json(req.params);
        }
    })
    .listen(3000);
