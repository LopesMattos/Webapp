

// this function is just here to be 
// a palce to call the api/test page we are
// testing
async function callDB(callback) {



    // Making a call to the URL we want to test
    // this page should return back JSON with the code 509 in it.
    await fetch('http://localhost:3000/api/test')
      .then((response) => response.json())
      .then((responseJson) => {
  
        //let content = responseJson.json();
        console.log("content...");
        console.log(responseJson);
  
  
  
        console.log("content returned from api/test.js");
  
        // See does the string "509" exist in the response we got back.
        // from calling the api/test page.
        if (Object.values(responseJson).indexOf('509') > -1) {
          console.log("found it");
  
          callback("509"); // send the number back to the unit test
        } else {
          console.log("didnt find it");
  
          callback("0"); // if we didn't find it, send back 0 to say we didn't find what we wanted.
  
        }
  
  
  
  
      });
  

  
  }
  
  
  QUnit.test('async example', assert => {
    const done = assert.async();
  
    callDB(res => {
      assert.strictEqual(res, "509", 'Result');
      done();
    });
  });