var express = require('express');

var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var path = require('path');

var app = express();

var router = express.Router();
var port = process.env.PORT || 3000;

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

// SETUP EXPRESS APPLICATION ====================================================
app.use('/', router);
app.use('/', serveIndex('./', {
	'icons': true,
	'view': 'details',
	'filter': function(filename, index, files, dir) {
		if ( filename == 'node_modules' || filename == 'server.js' || /\.ejs$/.test(filename) || filename == 'gruntfile.js' ) {
			return false;
		} else {
			return true;
		}
	}
}));
app.use(serveStatic(__dirname, {
	'index': ['default.html', 'default.htm']
}));

app.listen(port);

router.use('/',function(req,res,next){
	console.log('%s %s',req.method,req.url||req.path);
	next();
});

// router.post('/@magaele/calender/json/data1.json', function (req, res) {
//   res.sendFile( path.resolve(__dirname, './@magaele/calender/json/data1.json') );
// });