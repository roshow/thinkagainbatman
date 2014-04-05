function index(req, res){
    console.log('handling /');
    res.render('index.jade', {
        message: 'hello.'
    });
}

function defaultAction(req, res){
    console.log('handling *');
    res.send(404, 'default: 404')
}

module.exports = {
    index: index,
    defaultAction: defaultAction
};