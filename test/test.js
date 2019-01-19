////////////////////////////////////////////////////////////////////////////////
// Secure-JSON Source Code
// Author: HydroCarbons@outlook.com (ADF)
////////////////////////////////////////////////////////////////////////////////
var request = require("request");
var assert = require("assert");
////////////////////////////////////////////////////////////////////////////////
var HTTPCodes = require('../http_codes.json');
////////////////////////////////////////////////////////////////////////////////
function sendRequest(HTTPCode, simulateServerDelay) {
  var url = 'http://localhost:9090/status/' + HTTPCode;
  if( simulateServerDelay ) {
      url += "?sleep=" + Math.floor(Math.random()*500);
  }

  return (
      new Promise(function(resolve, reject) {
          var options = {
            method: 'GET',
            url: url
          };
          request(options, function (error, response, body) {
            if (error) {
              reject(error);
            }
            resolve(body);
          });
    }));
}
////////////////////////////////////////////////////////////////////////////////
async function tests() {

  var server = require("../src/index.js");
  server.start();

  var start_time = Date.now(), end_time;

  var testCaseNo = 1;
  for(let code in HTTPCodes) {
    console.log(Date.now() + " Test case [ " + testCaseNo + " ] simulating HTTP code " + code);
    let res = await sendRequest(code, false);
     console.log( "Response : " + res, "\n", JSON.stringify(HTTPCodes[code]) );
    if(HTTPCodes[code].description.length>0) {
      assert.deepEqual( JSON.stringify(HTTPCodes[code]), res );
    } else {
      assert.deepEqual( "", res );
    }
    testCaseNo++;
  }
  console.log("\n" + Date.now() + " [Status] All status code test cases passed.\n");

  for(let code in HTTPCodes) {
    console.log(Date.now() + " Test case [ " + testCaseNo + " ] simulating HTTP code " + code + " with random delay");
    let res = await sendRequest(code, true);
    // console.log( "Response : " + res, JSON.stringify(HTTPCodes[code]) );
    if(HTTPCodes[code].description.length>0) {
      assert.deepEqual( JSON.stringify(HTTPCodes[code]), res );
    } else {
      assert.deepEqual( "", res );
    }
    testCaseNo++;
  }
  console.log("\n" + Date.now() + " [Status] All test cases with delay simulation passed.\n");
  console.log(Date.now() + " All passed.");

  end_time = Date.now();
  console.log("[Status] Total time taken : ", Math.floor( (end_time-start_time)/1000) + " seconds" );

  server.stop();
}
////////////////////////////////////////////////////////////////////////////////

tests();

////////////////////////////////////////////////////////////////////////////////
