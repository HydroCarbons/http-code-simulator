////////////////////////////////////////////////////////////////////////////////
// Secure-JSON Source Code
// Author: HydroCarbons@outlook.com (ADF)
////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var app = express();
///////////////////////////////////////////////////////////////////////////////
var HOST_IP_ADDRESS   =  "127.0.0.1";
var HOST_PORT         =  "9090";
var HOST_SERVER_NAME  =  "HydroCarbons - HTTP Codes Simulator";
////////////////////////////////////////////////////////////////////////////////
var HTTPCodes = require('../http_codes.json');
////////////////////////////////////////////////////////////////////////////////
function helpHandler(req, res, next) {
  res.status(200).send(HTTPCodes);
  next();
}
////////////////////////////////////////////////////////////////////////////////
function statusHandler(req, res, next) {

  var pathTokens = req.url.split('/').filter(x=>x);
  if( !pathTokens || pathTokens[0] !== 'status' ) {
    next();
    return;
  }
  var code = pathTokens[1].split('?');

  var returnCode = parseInt( code[0]  );
  if( isNaN(returnCode) ) {
    next();
    return;
  }

  var after = 0;
  if( req.query['after'] ) {
    after = parseInt( req.query['after'] );
  }
  if( req.query['sleep'] ) {
    after = parseInt( req.query['sleep'] );
  }

  setTimeout( function() {
    if( typeof(HTTPCodes[returnCode]) != 'undefined' ) {
      res.status(returnCode).send(HTTPCodes[returnCode]);
    } else {
      res.status(404).send(HTTPCodes[404]);
    }
    next();
  }, after );
}
////////////////////////////////////////////////////////////////////////////////
app.get('/status/*', statusHandler);
app.get('/help', helpHandler);

function startServer() {
  app.listen(HOST_PORT);
}

function stopServer() {
  process.exit(0);
}

// StartServer
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
  if(2==index && val==='--startServer' ) {
    startServer();
    console.log("Server listening on : " + HOST_PORT);
  }
});

////////////////////////////////////////////////////////////////////////////////
module.exports.start = startServer;
module.exports.stop = stopServer;
