'use strict';

var server = require('./restapi/app').then(function(server){
    // console.log(server);
     server.listen(7888, function(){
        console.log('%s listening at %s', server.name, server.url);
    });
});
