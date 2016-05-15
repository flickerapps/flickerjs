[![logo](/assets/flickerjs.png)](https://www.npmjs.com/package/flickerjs)
Super rapido y simple framework web para [node.js](http://nodejs.org/).

[![Build Status](https://travis-ci.org/FlickerStudio/flickerjs.svg?branch=master)](https://travis-ci.org/FlickerStudio/flickerjs) [![Dependency Status](https://david-dm.org/flickerstudio/flickerjs.svg)](https://david-dm.org/flickerstudio/flickerjs) [![Build status](https://ci.appveyor.com/api/projects/status/qgxx72iq7wiluutm?svg=true)](https://ci.appveyor.com/project/flickerapps/flickerjs)
```javascript
const flicker = require('flickerjs');
var app = flicker();
app
    .add({
    url: '/',
    handler: (req, res) => {
        res.send('Hello Flicker.js');
        }
    })
    .listen(3000);

```

Aviso
====
Aun no tenemos un paquete de npm, a causa no que aun no tenemos un nombre especifico para el framework hispano. Si deseas sugerir un nombre puedes comentarlo [aqui](https://github.com/FlickerStudio/flickerjs/issues/6)

Por Ahora puedes instalar su version en ingles: Flicker.js
Instalar
====
```
$ npm install flickerjs
```

Como usar
====
a traves del paquete [flicker-easy](https://www.npmjs.com/package/flicker-easy).
Generamos la aplicacion:
```
$ flickerjs miaplicacion
```
O especificando el directorio
```
$ flicker miapp /mifolder
$ cd mifolder
```
Instalamos dependencias:
```
$ npm install
```
Arrancamos el servidor
```
$ npm start
```

Ejemplos
====
Para ver los ejemplos, clona el repositorio y luego corre el ejemplo que quieras.
Lista de archivos de ejemplo:

* api.js
* app.js
* basic.js
* router.js
* next.js

```
$ git clone https://github.com/flickerstudio/flickerjs.git
$ cd flickerjs
$ npm install
$ node /examples/[file]

```

Tests (Pruebas)
====
Para correr las pruebas, luego de clonar el repositorio:
```
$ npm install
$ npm test
```

Mini Dococumentacion
====
[Guia rapida](GUIA.md)



Contribuidores
====
Gracias a:
* [Christopher Ventura](http://github.com/chrisvent)
* [Dawson Botsford](http://github.com/dawsonbotsford)

Licencia
====
[MIT](LICENCIA)
