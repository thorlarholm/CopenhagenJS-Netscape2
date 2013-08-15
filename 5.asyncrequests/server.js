var cookie = require('cookie'),
	http = require('http'),
	fs = require('fs');

var server = http.createServer(function (request, response) {

	var c = request.headers["cookie"], cData, cResponse = "nothing";
	if (c) {
		cData = cookie.parse( c );

		if (!cData || !cData.Request) {
			cResponse = "Boo :( try again";
		} else {
			cResponse = "Yay :) You sent: " + cData.Request;
		}
		cResponse = cookie.serialize("Response", cResponse);

	} else {
		cResponse = cookie.serialize("Response", "You sent nothing :(");
	}

	var img = fs.readFileSync("./blank.gif");

	response.writeHead(200, {"Content-Type": "image/gif", "Set-Cookie": cResponse});
	response.end(img, "binary");

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(7008);
