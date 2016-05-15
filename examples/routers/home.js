const flicker = require('../../');
var router = flicker().Router();
var blogRouter = require('./blog');

router
    .add({
        url: '/',
        method: 'GET',
        handler: (req,res,next) => {
           res.render('index',{title: 'Welcome to Flicker.js', message: 'FlickerJS esta funcionando'});
            }
    })
    .add({
        url: '/blog',
        method: 'GET',
        handler: blogRouter
    })
    .add({
        url: '/login',
        method: 'GET',
        handler: (req,res,next) => {
            var alert = {
                msg: 'Password o usuario incorrecto',
                type: 'error'
            }
            res.render('index',{title: 'Iniciar Sesion'});
        }
    })

module.exports = router;
