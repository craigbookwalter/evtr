/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/restify/restify.d.ts' />
var restify = require("restify");

var data = [];

function save_entry(req, res, next) {
	record = {id: data.length+1, data: req.body.data, timestamp: Date.now()}
    data.push(record);
    console.log("Stored " + record['timestamp'] + " in book " + req.params.book)
    res.send(201, 'created /' + req.params.book + '/' + data.length);

    return next();
}

function get_entry(req, res, next) {
    if (reqs.param.id > data.length)
         res.send(404, 'entry id ' + req.params.id + ' not found');

	res.send(200, data[req.params.id-1]);
	return next();
}

function get_book(req, res, next) {
	res.send(200, data)
	return next();
}

var server = restify.createServer();

server.on('uncaughtException', function (req, res, route, err) {
    console.log('uncaughtException', err.stack);
});

server.use(restify.bodyParser());

server.get('/evtr/v1/:book', get_book);
server.post('/evtr/v1/:book', save_entry);
server.get('/evtr/v1/:book/:id', get_entry);

console.log("start server on port 8080");
server.listen(8080, function () {
    console.log('%s listening on %s', server.name, server.url);
});
