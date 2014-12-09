var http = require('http')

var proxy = http.createServer(function(request, response){

	var host = request.headers.host
	var options = {
		host: host,
		path: request.url,
		method: request.method,
		headers: request.headers
	}

	console.log(request.url)

	if(host == 'h5.iqg.com'){
		options.port = 8000
	}
	else if(host == 'api.iqg.com'){
		options.port = 8081
	}
	else{
		response.statusCode = 200
		response.write('default server...')
		response.end()
		return
	}

	http.request(options, function(res){

		res.pipe(response)

	}).end()

}).listen(80, function(){
	console.log('server running on port: 80')
})