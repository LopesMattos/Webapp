export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")


  // get the values
  // that were sent across
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')

  console.log(email);
  console.log(pass);

 // =================================================
 //database call
  const { MongoClient } = require('mongodb');

  const url = 'mongodb+srv://b00158429:1nKgaqNVZAjsMX40@cluster0.y4vuffj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(url);
  
 
  const dbName = 'app'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login'); // collection name


  const findResult = await collection.find ({"username": email, "pass": pass}).toArray();
  console.log('Found documents =>', findResult);

  // If we find the record, the valid variable is set to true, otherwise it is set to false
  let valid = false
  if(findResult.length >0 ){
      valid = true;
      console.log("login valid")
  } else {

    valid = false;
    console.log("login invalid")
  }


  // at the end of the process we need to send something back.
  return Response.json({ "data":"" + valid + ""})
}

