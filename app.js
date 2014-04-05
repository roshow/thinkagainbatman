'use strict';
var restify = require('restify'),
    handler = require('./lib/handler'),
    server = restify.createServer({ name: 'basicRestify' });

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

handler.connectDb()
    .then(function(){
        /** Go get some! **/
        server.get(/^\/[a-zA-Z0-9_\.~-]+\/(.*)/, handler.get);

        /** I'm here to listen **/
        server.listen(7777, function(){
            console.log('%s listening at %s', server.name, server.url);
        });
    });
