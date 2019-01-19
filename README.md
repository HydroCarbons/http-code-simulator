# http-code-simulator

## Travis CI Status
[![Build Status](https://travis-ci.com/HydroCarbons/http-code-simulator.svg?branch=master)](https://travis-ci.com/HydroCarbons/http-code-simulator)
[![Coverage Status](https://coveralls.io/repos/github/HydroCarbons/http-code-simulator/badge.svg?branch=master)](https://coveralls.io/github/HydroCarbons/http-code-simulator?branch=master)

# http-code-simulator
- **http-code-simulator** is a HTTP response code simulator server. One can test various HTTP response codes from the server on the client side using this simulator with an optional server side processing time.

## Install the simulator
1. Clone this repository http-code-simulator
1. Switch to folder http-code-simulator
1. Install dependencies: ` npm install `
1. Start the server: ` npm start `  Or ` node ./src/index.js --startServer `
1. Simulator will be running @ ` <localhost>:<9090> `

## Usage (client side)
1. Send client HTTP requests (any HTTP Method) to ` <localhost>:<9090>/status/<HTTPCode> `
1. Simulate server side delay with ` <localhost>:<9090>/status/<HTTPCode>?sleep=<Miliseconds> `

## Test
1. Execute test run ` npm test `


# HTTP Status codes

```javascript

"101": { "description":  "" },

"200": { "description":  "OK" },
"201": { "description":  "Created" },
"202": { "description":  "Accepted" },
"203": { "description":  "Non-Authoritative Information" },
"204": { "description":  "" },
"205": { "description":  "Reset Content" },
"206": { "description":  "Partial Content" },
"207": { "description":  "Multi-Status (WebDAV)" },
"208": { "description":  "Already Reported (WebDAV)" },
"226": { "description":  "IM Used" },

"300": { "description":  "Multiple Choices" },
"301": { "description":  "Moved Permanently" },
"302": { "description":  "Found" },
"303": { "description":  "See Other" },
"304": { "description":  "" },
"305": { "description":  "Use Proxy" },
"306": { "description":  "Unused" },
"307": { "description":  "Temporary Redirect" },
"308": { "description":  "Permanent Redirect" },

"400": { "description":  "Bad Request" },
"401": { "description":  "Unauthorized" },
"402": { "description":  "Payment Required" },
"403": { "description":  "Forbidden" },
"404": { "description":  "Not Found" },
"405": { "description":  "Method Not Allowed" },
"406": { "description":  "Not Acceptable" },
"407": { "description":  "Proxy Authentication Required" },
"408": { "description":  "Request Timeout" },
"409": { "description":  "Conflict" },
"410": { "description":  "Gone" },
"411": { "description":  "Length Required" },
"412": { "description":  "Precondition Failed" },
"413": { "description":  "Request Entry Too Large" },
"414": { "description":  "Request-URI Too Long" },
"415": { "description":  "Unsupported Media Type" },
"416": { "description":  "Requested Range Not Satisfiable" },
"417": { "description":  "Expectation Failed" },
"418": { "description":  "I'm a teapot (RFC 2324)" },
"420": { "description":  "Enhance Your Calm (Twitter)" },
"422": { "description":  "Unprocessable Entity (WebDAV)" },
"423": { "description":  "Locked (WebDAV)" },
"424": { "description":  "Failed Dependency (WebDAV)" },
"425": { "description":  "Reserved for WebDAV" },
"426": { "description":  "Upgrade required" },
"428": { "description":  "Precondition Required" },
"429": { "description":  "Too Many Requests" },
"431": { "description":  "Request Header Fields Too Large" },
"444": { "description":  "No Response (Nginx)" },
"449": { "description":  "Retry With (Microsoft)" },
"450": { "description":  "Blocked by Windows Parental Controls (Microsoft)" },
"451": { "description":  "Unavailable For Legal Reasons" },
"499": { "description":  "Client Closed Request (Nginx)" },

"500": { "description":  "Internal Server Error" },
"501": { "description":  "Not Implemented" },
"502": { "description":  "ad Gateway" },
"503": { "description":  "Service Unavailable" },
"504": { "description":  "Gateway Timeout" },
"505": { "description":  "HTTP Version Not Supported" },
"506": { "description":  "Variant Also Negotiates (Experimental)" },
"507": { "description":  "Insufficient Storage (WebDAV)" },
"508": { "description":  "Loop Detected (WebDAV)" },
"509": { "description":  "Bandwidth Limit Exceeded (Apache)" },
"510": { "description":  "Not Extended" },
"511": { "description":  "Network Authentication Required" },
"520": { "description":  "Web server is returning an unknown error" },
"522": { "description":  "Connection timed out" },
"524": { "description":  "A timeout occurred" },
"598": { "description":  "Network read timeout error" },
"599": { "description":  "Network connect timeout error" }

```
