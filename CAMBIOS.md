2.0.4
====
* [Agregamos] Manejador de errores en la vista.

2.0.3
====
* asignamos los directorios por defecto usando __dirname:  `app.set(___dirname + '/dir') `

2.0.1
====
* Robustez en routers anidades
* Asignacion de Content-Length automatico al enviar string con `res.send`

2.0.0
====
* `app.add` tambien recibe un arreglo de handlers
* [Renombramos] `app.to` a `app.add`

1.1.0
====
* [Asigamod] morgan como logger por default (consola)
* [Agregamos] `Response.header`
* [Agregamos] `Response.set`
* [Agregamos] `Response.get`

1.0.1
====
* [Reparado] bug cuando el path del router era `/`

1.0.0
====
* [Renombramos] `app.use` a `app.to`
* [Actualizamos] la funcion `Response.json`

0.1.7
====
* [Agregamos] promesas en  `app.use`
* [Agregamos] `flicker-easy` como generador de aplicaciones

0.1.4
====
* [Agregamos] Manejador de errores a traves del navegador

0.1.3
====
* [Agregamos] `res.params` para urls como: `/user/:id`

0.1.1
====
* Middleware por defecto cuando la pila de routers esta vacia
