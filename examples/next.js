const flicker = require('../');
let app = flicker();

app.add(
    (req,res,next) => {
        console.log('Aviso: ');
        next();
    }
)
    .add({
        handler:[
            (req,res,next) => {
                console.log('Deberias ver esto porque aariba use next');
                res.end();
            },
            (req,res,next) => {
                console.log('Pero, no deberias ver esto porque arriba no use next');
                res.end();
            }

        ]
    })
    .listen(3000);
