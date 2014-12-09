var http = require('http')

var proxy = http.createServer(function(request, response){

	var host = request.headers.host
	var options = {
		host: host,
		path: request.url,
		method: request.method,
		headers: request.headers
	}

	if(host == 'h5.iqg.com'){
		options.port = 8000
	}
	else if(host == 'api.iqg.com'){
		options.port = 8081
	}
	else{
		response.status(200).send('default server...')
		return
	}

	var req = http.request(options, function(res){

		res.pipe(response)

		console.log(request.url)
	}).end()

}).listen(80, function(){
	console.log('server running on port: 80')
})