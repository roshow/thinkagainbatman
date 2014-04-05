var express = require('express'),
    handler = require('./handler'),
    routing = require('./routing'),
    app = express();

var routes = routing.routes,
    L = routes.length;
for (var i = 0; i < L; i++){
    if(routes[i].public === true){
        app.use(express.static(__dirname + routes[i].path));
    }
    else {
        app[routes[i].method](routes[i].path, handler[routes[i].action]);
    }
}
app.listen(routing.port);
console.log('Listening on port %s', routing.port);