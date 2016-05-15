const flicker = require('../../');

var router = flicker().Router();

router
    .add({
        url: '/foo',
        method: 'GET',
        handler: (req,res,next) => {
            res.render('index',{title: 'Bienvenido a Flicker.js', message: 'Hola, Soy ' + req.url});
        }
    })
    .add({
        url: '/',
        method: 'GET',
        handler: (req,res,next) => {
            res.render('index',{title: 'Bienvenido a Flicker.js', message: 'Hola, Soy ' + req.url});
        }
    })

module.exports = router;
