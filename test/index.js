'use strict'
const should = require('should');
const assert = require('assert');
const request = require('supertest');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flicker = require('../');

describe('Aplicacion',
    () => {
        it('Debe ser ejecutable',
            () => {
                let app = flicker();
                assert.equal(typeof app,'function');
            }
        );

        it('Functiones get y set',
            (done) => {
                let app = flicker()
                .add((req,res,next) => {
                    app.set('foo','bar');
                    next();
                })
                .add((req,res,next) => {
                    res.send(app.get('foo'));
                });
                request(app)
                .get('/')
                .expect(200,'bar',done);
            }
        );
        it('Locals deben ser heredadas',
            (done) => {
                let app = flicker()
                app.locals = { blog_title: 'Lorem Ipsum'};
                app.add((req,res,next) => {
                    app.locals.description =  'Lorem Ipsum dolor sit amet';
                    next();
                })
                .add({
                    url: '/pretty',
                    handler: (req,res,next) => {
                        res.send(app.locals.blog_title);
                    }
                });

                request(app)
                .get('/pretty')
                .expect(200,'Lorem Ipsum',done);
            }
        );
    }
);
describe('Codigos de estados del Router',
    () => {
        it('debe ser 200',
            (done) => {
                let app = flicker()
                .add((req,res,next) => {
                    res.sendStatus(200);
                });
                request(app)
                .get('/')
                .expect(200,done);

        });
        it('debe ser 404',
            (done) => {
                let app = flicker()
                request(app)
                .get('/')
                .expect(404,done);

        });
        it('debe ser 201',
            (done) => {
                let app = flicker()
                .add(
                    (req,res) => {
                        res.status(201).end();
                    }
                );
                request(app)
                .get('/')
                .expect(201,done);
            }
        );
        it('debe ser 500',
            (done) => {
                let app = flicker()
                .add((req,res) => {
                    res.status(500).end();
                });
                request(app)
                .get('/')
                .expect(500,done);
            }
        );
    }
);

describe('Delegacion de Routers',
    () => {
        it('incluir router',
            (done) => {
                let app = flicker()
                let router = app.Router()
                .add({
                    url: '/blog',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.send('im /blog');
                    }
                })
                app.add({
                    url: "/",
                    handler: router
                })
                request(app)
                .get('/blog')
                .expect(200,done);
            }
        );
        it('Routers aninados',
            (done) => {
                let app = flicker()
                let router1 = app.Router();
                let router2 = app.Router();
                let router3 = app.Router();

                router3
                    .add({
                        url: '/wrong',
                        handler: (req,res,next) => {
                            res.send("Wrong");
                        }
                    })
                    .add({
                        url: '/bar',
                        handler: (req,res,next) => {
                            res.send('Hello!');
                        }
                    });
                router2
                    .add({
                        url: '/wrong',
                        handler: (req,res,next) => {
                            res.send("Wrong");
                        }
                    })
                    .add({
                        url: '/foo',
                        handler: router3
                    });
                router1
                    .add({
                        url: '/wrong',
                        handler: (req,res,next) => {
                            res.send("Wrong");
                        }
                    })
                    .add({
                        url: '/bar',
                        handler: router2
                    });
                app
                    .add({
                        url: '/wrong',
                        handler: (req,res,next) => {
                            res.send("Wrong");
                        }
                    })
                    .add({
                        url: '/foo',
                        handler: router1
                    })
                request(app)
                .get('/foo/bar/foo/bar')
                .expect(200,"Hello!",done);

            }
        );
    }
);

describe('Manejando diferentes verbos HTTP ',
    () => {
        it('los middlewares responden en todos los verbos',
            (done) => {
                let app = flicker()
                .add(
                    (req,res,next) => {
                        res.send("Flicker");
                    }
                );
                request(app)
                .patch('/')
                .expect(200,"Flicker",done);

            }
        );

        it('GET',
            (done) => {
                let app = flicker()
                let router = app.Router();
                router.add({
                    url: '/app',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.send("Flicker");
                    }
                })
                app.add(router);
                request(app)
                .get('/app')
                .expect(200,"Flicker",done);

            }
        );

        it('POST',
            (done) => {
                let app = flicker();
                let router = app.Router();
                router.add({
                    url: '/app',
                    method: 'POST',
                    handler: (req,res,next) => {
                        res.send("Flicker");
                    }
                })
                app.add(router);
                request(app)
                .post('/app')
                .expect(200,"Flicker",done);

            }
        );

        it('PUT',
            (done) => {
                let app = flicker();
                let router = app.Router();
                router.add({
                    url: '/app',
                    method: 'PUT',
                    handler: (req,res,next) => {
                        res.send("Flicker");
                    }
                })
                app.add(router);
                request(app)
                .put('/app')
                .expect(200,"Flicker",done);

            }
        );

        it('DELETE',
            (done) => {
                let app = flicker();
                let router = app.Router();
                router.add({
                    url: '/app',
                    method: 'DELETE',
                    handler:  (req,res,next) => {
                        res.send("Flicker");
                    }
                })
                app.add(router);
                request(app)
                .delete('/app')
                .expect(200,"Flicker",done);

            }
        );

        it('PATCH',
            (done) => {
                let app = flicker()
                let router = app.Router();
                router.add({
                    url: '/app',
                    method: 'PATCH',
                    handler: (req,res,next) => {
                        res.send("Flicker");
                    }
                })
                app.add(router);
                request(app)
                .patch('/app')
                .expect(200,"Flicker",done);

            }
        );


        it('GET no responde para el metodo POST',
            (done) => {
                let app = flicker()
                let router = app.Router();
                router.add({
                    url: '/pretty',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.send('I am a GET Response');
                    }
                })
                app.add(router);
                request(app)
                .post('/pretty')
                .expect(404,done);
            }
        );

        it('PUT no responde por el metodo DELETE',
            (done) => {
                let app = flicker()
                let router = app.Router();
                router.add({
                    url: '/pretty',
                    method: 'PUT',
                    handler: (req,res,next) => {
                        res.send('I am a GET Response');
                    }
                })
                app.add(router);
                request(app)
                .delete('/pretty')
                .expect(404,done);
            }
        )
    }
);

describe('Objecto Response',
    () => {
        it('end()',
            (done) => {
                let app = flicker()
                .add(
                    (req,res) => {
                        res.end("foo");
                    }
                );

                request(app)
                .get('/')
                .expect(200,'foo',done);
            }
        );
        it('send()',
            (done) => {
                let app = flicker()
                .add(
                    (req,res) => {
                        res.send("bar");
                    }
                );

                request(app)
                .get('/')
                .expect(200,'bar',done);
            }
        );

        it('status()',
            (done) => {
                let app = flicker()
                .add(
                    (req,res) => {
                        res.status(500).end("bar");
                    }
                );

                request(app)
                .get('/')
                .expect(500,'bar',done);
            }
        );

        it('preventStatus() no sobreescribe el codigo de estado actual',
            (done) => {
                let app = flicker()
                .add(
                    (req,res) => {
                        res.status(200).preventStatus(404).end();
                    }
                );

                request(app)
                .get('/')
                .expect(200,done);
            }
        );
        it('json()',
            (done) => {
                let app = flicker()
                .add(
                    (req,res) => {
                        res.json({ foo: 'bar' } );
                    }
                );

                request(app)
                .get('/')
                .expect(200,{ foo: 'bar' },done);
            }
        );

        it('sendFile()',
            (done) => {
                let app = flicker()
                .add({
                    url: '/pretty',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.sendFile('examples/public/test.json');
                    }
                })
                request(app)
                .get('/pretty')
                .expect(200,done);
            }
        );

        it('render()',
            (done) => {
                let app = flicker()
                .add({
                    url: '/pretty',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.render('./test/views/index',{});
                    }
                })
                request(app)
                .get('/pretty')
                .expect(200,done);
            }
        );
        it('redirect()',
            (done) => {
                let app = flicker()
                .add({
                    url: '/pretty',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.redirect('http://google.com/');
                    }
                })
                request(app)
                .get('/pretty')
                .expect(302,done);
            }
        );
        it('locals debe ser heredados',
            (done) => {
                let app = flicker()
                .add((req,res,next) => {
                    res.locals = { user: 'me' };
                    next();
                })
                .add({
                    url: '/pretty',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.send(res.locals.user);
                    }
                })
                request(app)
                .get('/pretty')
                .expect(200,'me',done);
        });
    }
);

describe('Objeto Request',
    () => {
        it('body debe ser heredado',
            (done) => {
                let app = flicker()
                let router = app.Router();
                app.add(bodyParser.json());
                router.add({
                    url: '/pretty',
                    method: 'POST',
                    handler: (req,res,next) => {
                        res.send(req.body.name);
                    }
                })
                app.add(router);
                request(app)
                .post('/pretty')
                .send({
                    name: 'me'
                })
                .expect(200,'me',done);
        });

        it('cookies debe ser heredados',
            (done) => {
                let app = flicker()
                let router = app.Router();
                app.add(cookieParser())
                .add((req,res,next) => {
                    req.cookies = {'foo':'bar'};
                    next();
                });
                router.add({
                    url: '/pretty',
                    method:'GET',
                    handler: (req,res,next) => {
                        res.send(req.cookies.foo);
                    }
                })
                app.add(router);
                request(app)
                .get('/pretty')
                .expect(200,'bar',done);
        });

        it('Url',
            (done) => {
                let app = flicker()
                let router = app.Router();
                app.add(cookieParser());
                router.add({
                    url: '/pretty',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.send(req.url);
                    }
                })
                app.add(router);
                request(app)
                .get('/pretty?=df')
                .expect(200,'/pretty?=df',done);
        });

        it('Path',
            (done) => {
                let app = flicker()
                let router = app.Router();
                app.add(cookieParser());
                router.add({
                    url: '/pretty',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.send(req.path);
                    }
                })
                app.add(router);
                request(app)
                .get('/pretty?=df')
                .expect(200,'/pretty',done);
        });

        it('Method',
            (done) => {
                let app = flicker()
                let router = app.Router();
                app.add(cookieParser());
                router.add({
                    url: '/pretty',
                    method: 'PUT',
                    handler: (req,res,next) => {
                        res.send(req.method);
                    }
                })
                app.add(router);
                request(app)
                .put('/pretty')
                .expect(200,'PUT',done);
        });

        it('Params',
            (done) => {
                let app = flicker()
                let router = app.Router();
                router.add({
                    url: '/user/:id',
                    method: 'GET',
                    handler: (req,res,next) => {
                        res.send(req.params.id);
                    }
                })
                app.add(router);
                request(app)
                .get('/user/5')
                .expect(200,'5',done);
            }
        );

        it('Query',
            (done) => {
                let app = flicker()
                .add((req,res,next) => {
                    res.send(req.query());
                });
                request(app)
                .get('/?foo=bar')
                .expect(200,'foo=bar',done);
            }
        );
    }
);

describe('Sirviendo contenido estatico',
    () => {
        it('OK /favicon.ico',
            (done) => {
                let app = flicker()
                app.set('static dir',__dirname + '/public');
                app.add(app.serveStatic());
                request(app)
                .get('/favicon.ico')
                .expect(200,done);
            }
        );

        it('OK /css/style.css',
            (done) => {
                let app = flicker()
                app.set('static dir',__dirname + '/public');
                app.add(app.serveStatic());
                request(app)
                .get('/css/style.css')
                .expect(200,done);
            }
        );

        it('OK /js/index.js',
            (done) => {
                let app = flicker()
                app.set('static dir',__dirname + '/public');
                app.add(app.serveStatic());
                request(app)
                .get('/js/index.js')
                .expect(200,done);
            }
        );

        it('OK /test.json',
            (done) => {
                let app = flicker()
                app.set('static dir',__dirname + '/public');
                app.add(app.serveStatic());
                request(app)
                .get('/test.json')
                .expect(200,done);
            }
        );
    }
);
