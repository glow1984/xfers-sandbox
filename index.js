var http = require('http');
var https = require('https');

var express        =        require('express');
var bodyParser     =        require('body-parser');
var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/signup_login', function(requ, resp) {
	
	var crypto = require('crypto')
	, shasum = crypto.createHash('sha1');
		shasum.update(requ.body.phone_no+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	hash =shasum.digest('hex')
	
	//console.log(requ.body.phone_no+'xTSD2-XZVBo3iv-GsZEEaYM6E122GYbKsHs3vnKwxcY');
	//console.log(hash);

	var options = {
	  host: 'sandbox.xfers.io',
	  port: '443',
	  path: '/api/v3/authorize/signup_login',
	  method: 'POST',
	  headers: {
		'X-XFERS-APP-API-KEY': 'NeZGR-z2pu1ksERU4taVV2nyKCy89jgJAqxGM2Dm6Nw',
		'Content-Type': 'application/json'
	  }
	};

	var data = JSON.stringify({
		'phone_no': requ.body.phone_no,
		'signature': hash
	});

	var req = https.request(options, function(res) {
	  var msg = '';

	  res.setEncoding('utf8');
	  res.on('data', function(chunk) {
		msg += chunk;
	  });
	  res.on('end', function() {
		console.log(JSON.parse(msg));
		resp.send(JSON.parse(msg));
	  });
	});

	req.write(data);
	req.end();
	
	/*var newQuote = {
		phone_no : requ.body.phoneNo,
		signature : requ.body.signature
	}; 
	data.push(newQuote);
	resp.json(true);*/
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});