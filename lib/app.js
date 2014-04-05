'use strict';
var restify = require('restify'),
    handler = require('./handler'),
    server = restify.createServer({ name: 'thinkbatman' });
    
server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

handler.connectDb()
    .then(function(){
        /** Go get some! **/
        server.get(/^\/(?:bat-|)thought(?:\/(.*)|)$/, handler.thought.get);
        /** Put some over here **/
        server.put(/^\/(?:bat-|)thought(?:\/|)$/, handler.thought.put);
        /** I'm here to listen **/
        server.listen(7777, function(){
            console.log('%s listening at %s', server.name, server.url);
        });
    });
