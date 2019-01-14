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
var HTTPCodes = {
  '200': { description:  "OK" },
  '201': { description:  "Created" },
  '202': { description:  "Accepted" },
  '203': { description:  "Non-Authoritative Information" },
  '204': { description:  "" }, // As it is No Content
  '205': { description:  "Reset Content" },
  '206': { description:  "Partial Content" },
  '300': { description:  "Multiple Choices" },
  '301': { description:  "Moved Permanently" },
  '302': { description:  "Found" },
  '303': { description:  "See Other" },
  '304': { description:  "" }, // As it is Not Modified
  '305': { description:  "Use Proxy" },
  '306': { description:  "Unused" },
  '307': { description:  "Temporary Redirect" },
  '308': { description:  "Permanent Redirect" },
  '400': { description:  "Bad Request" },
  '401': { description:  "Unauthorized" },
  '402': { description:  "Payment Required" },
  '403': { description:  "Forbidden" },
  '404': { description:  "Not Found" },
  '405': { description:  "Method Not Allowed" },
  '406': { description:  "Not Acceptable" },
  '407': { description:  "Proxy Authentication Required" },
  '408': { description:  "Request Timeout" },
  '409': { description:  "Conflict" },
  '410': { description:  "Gone" },
  '411': { description:  "Length Required" },
  '412': { description:  "Precondition Failed" },
  '413': { description:  "Request Entry Too Large" },
  '414': { description:  "Request-URI Too Long" },
  '415': { description:  "Unsupported Media Type" },
  '416': { description:  "Requested Range Not Satisfiable" },
  '417': { description:  "Expectation Failed" },
  '418': { description:  "I'm a teapot" },
  '422': { description:  "Unprocessable Entity" },
  '428': { description:  "Precondition Required" },
  '429': { description:  "Too Many Requests" },
  '431': { description:  "Request Header Fields Too Large" },
  '451': { description:  "Unavailable For Legal Reasons" },
  '500': { description:  "Internal Server Error" },
  '501': { description:  "Not Implemented" },
  '502': { description:  "ad Gateway" },
  '503': { description:  "Service Unavailable" },
  '504': { description:  "Gateway Timeout" },
  '505': { description:  "HTTP Version Not Supported" },
  '511': { description:  "Network Authentication Required" },
  '520': { description:  "Web server is returning an unknown error" },
  '522': { description:  "Connection timed out" },
  '524': { description:  "A timeout occurred" },
};
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

console.log("Server listening on : " + HOST_PORT);
app.listen(HOST_PORT);
////////////////////////////////////////////////////////////////////////////////
