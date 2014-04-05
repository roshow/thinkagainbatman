'use strict';
var restify = require('restify'),
    handler = require('./lib/handler'),
    server = restify.createServer({ name: 'thinkbatman' });

var conf = {
    DB_USER: 'batman',
    DB_PW: 'androbin',
    DB_FULLPATH: 'ds043388.mongolab.com:43388/thinkbatman'
};

console.log('mongodb://' + conf.DB_USER + ':' + conf.DB_PW +  '@' + conf.DB_FULLPATH);

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

handler.connectDb('mongodb://' + conf.DB_USER + ':' + conf.DB_PW +  '@' + conf.DB_FULLPATH)
    .then(function(){
        /** Go get some! **/
        server.get('/thought', handler.thought.get);
        server.get('/thought/:batId', handler.thought.get);
        /** Put some over here **/
        server.put('/thought', handler.thought.put);
        /** I'm here to listen **/
        server.listen(7777, function(){
            console.log('%s listening at %s', server.name, server.url);
        });
    });
