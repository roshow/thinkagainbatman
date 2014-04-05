'use strict';
var restify = require('restify'),
    handler = require('./handler'),
    server = restify.createServer({ name: 'thinkbatman' }),
    routes;

routes = [
    {
        path:/^\/(?:bat-|)thought(?:\/(.*)|)$/,
        action: handler.thought.get,
        method: 'get'
    },
    {
        path:/^\/(?:bat-|)thought(?:\/|)$/,
        action: handler.thought.get,
        method: 'put'
    }
];
    
function startServer(){
    server
      .use(restify.fullResponse())
      .use(restify.bodyParser());

    routes.forEach(function(route){
        server[route.method](route.path, route.action);
    });

    // server.listen(7777, function(){
    //     console.log('%s listening at %s', server.name, server.url);
    // });
    return server;
}

module.exports = handler.connectDb().then(startServer);

