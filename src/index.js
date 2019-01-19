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
  '100': { description:  "Continue" },
  '101': { description:  "Switching Protocols" },
  '102': { description:  "Processing (WebDAV)" },

  '200': { description:  "OK" },
  '201': { description:  "Created" },
  '202': { description:  "Accepted" },
  '203': { description:  "Non-Authoritative Information" },
  '204': { description:  "" }, // As it is No Content
  '205': { description:  "Reset Content" },
  '206': { description:  "Partial Content" },
  '207': { description:  "Multi-Status (WebDAV)" },
  '208': { description:  "Already Reported (WebDAV)" },
  '226': { description:  "IM Used" },

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
  '418': { description:  "I'm a teapot (RFC 2324)" },
  '420': { description:  "Enhance Your Calm (Twitter)" },
  '422': { description:  "Unprocessable Entity (WebDAV)" },
  '423': { description:  "Locked (WebDAV)" },
  '424': { description:  "Failed Dependency (WebDAV)" },
  '425': { description:  "Reserved for WebDAV" },
  '426': { description:  "Upgrade required" },
  '428': { description:  "Precondition Required" },
  '429': { description:  "Too Many Requests" },
  '431': { description:  "Request Header Fields Too Large" },
  '444': { description:  "No Response (Nginx)" },
  '449': { description:  "Retry With (Microsoft)" },
  '450': { description:  "Blocked by Windows Parental Controls (Microsoft)" },
  '451': { description:  "Unavailable For Legal Reasons" },
  '499': { description:  "Client Closed Request (Nginx)" },

  '500': { description:  "Internal Server Error" },
  '501': { description:  "Not Implemented" },
  '502': { description:  "ad Gateway" },
  '503': { description:  "Service Unavailable" },
  '504': { description:  "Gateway Timeout" },
  '505': { description:  "HTTP Version Not Supported" },
  '506': { description:  "Variant Also Negotiates (Experimental)" },
  '507': { description:  "Insufficient Storage (WebDAV)" },
  '508': { description:  "Loop Detected (WebDAV)" },
  '509': { description:  "Bandwidth Limit Exceeded (Apache)" },
  '510': { description:  "Not Extended" },
  '511': { description:  "Network Authentication Required" },
  '520': { description:  "Web server is returning an unknown error" },
  '522': { description:  "Connection timed out" },
  '524': { description:  "A timeout occurred" },
  '598': { description:  "Network read timeout error" },
  '599': { description:  "Network connect timeout error" }
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
