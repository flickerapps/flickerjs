Despues de haber instalador el modulo (y claramente node.js), requerimos flicker.js:
```javascript
const flicker = require('fickerjs');
```
iniciamos la aplicacion:
```javascript
let app = flicker();
```

Si quieres, puedes cambiar las opciones por defecto:
```javascript
app
    .set('template','pug') /* motor de vistas */
    .set('static dir','./public') /* directorio de contenido estatico (.css, .js, .json...)*/
    .set('views dir','./views'); /* directorio de las vistas ( .pug, .haml, .html) */
app.locals.foo = 'bar'; /* app.locals es un objectto el cual podemos usar (o llamarlo) en cualquier lugar de la aplicacion (middlewares, routers, renders...)*/
```
Ahora, podemos agregar los `middlewares` que querramos:
```javascript
app.add(compress()) /* compresion de datos */
    .add(favicon('./public/favicon.ico')) /* servimos el favicon y los cacheamos */
    .add(app.serveStatic('./public')) /* servimos contenido estatico */
    .add(bodyParser.json()) /* parser de data a req.body */
    .add(bodyParser.urlencoded({ extended: true })) /* lo mismo que arriba */
    .add(cookieParser()) /* parseamos las cookies del navegador a req.cookies */
```
podemos asignar routers para un path (o todos)  y un metodo (verbo http) a traves de 'app.add'.

| Parametro | Objeto |
|-----|---------|
| req | Peticion. |
| res | Respuesta. |
| next | Siguiente middleware a llamar. |

```javascript
app.add(
    (req,res,next) => {
        res.render("index",{ title: 'Mi Titulo de pagina'});
    }
);
```
##Response
instancia de http.ServerResponse.
```javascript
res.send('foo'); /* => envia 'foo' al navegador */
res.status(404); // codigo de estado 404
res.status(404).send('Not Found'); /* => envia el error 404 y 'Not Found' */
res.sendStatus(404); /* => equivale a lo de arriba */
res.json({'foo': 'bar'}) /* => envia '{'foo':'bar'}'*/
res.sendFile('/test.json') /* => envia el contenido del archivo /public/test.json (o en tu directorio de archivos estaticos)*/
res.render('index',{foo: 'bar',bar: 'foo'}) /* => renderiza la vista index.pug (por defecto, o tu motor de vistas)*/
res.redirect('/foo') /* => redirecciona los usuarios hacia /foo */
res.locals /* => es similar a app.locals  pero solo permanece en la peticion actual (puedes actualizarlo en cada peticion a traves de middlewares) */
```

##Router
Es un manejador para tus urls. Puedes anidar los routers que quieras a tu aplicacion, asi como a otros routers.
```javascript
let router = app.Router();

router
    .add({
        url: '/path',
        method: 'GET',
        handler: (req,res,next) => { /* lo que sea */}
    })
    .add({
        url: '/path',
        method: 'POST',
        handler: (req,res,next) => { /* lo que sea */}
    })
    .add({
        url: '/path',
        method: 'PUT',
        handler: (req,res,next) => { /* lo que sea */}
    })
    .add({
        url: '/path',
        method: 'DELETE',
        handler: (req,res,next) => { /* lo que sea */}
    })
    .add({
        url: '/path',
        method: 'PUT',
        handler: (req,res,next) => { /* lo que sea */}
    })
    .add({
        url: '/user/:id',
        handler: (req,res,next) => { /* req.params.id */}
    })

/* lo incorporamos a la aplicacion */
app
    .add({
    url: '/foo',
    handler: router
    })
```
