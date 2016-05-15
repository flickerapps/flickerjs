const flicker = require('../../');
var router = flicker().Router();
router
    .add({
        url: '/',
        method: 'GET',
        handler: (req,res,next) => {
            var alert = {
                msg: 'No se encontraron entradas',
                type: 'info'
            }
            res.render('index', {title: 'Blog', alert: alert} );
        }
    })
    .add({
        url: '/:slug',
        method: 'GET',
        handler: (req,res,next) => {
            res.render('index',{title: req.params.slug});
        }
    })

module.exports = router;
