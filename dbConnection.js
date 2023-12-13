//Single DB connection file for application to use across MVC format

//moved from server.js
const { MongoClient, ServerApiVersion } = require("mongodb");
//Localhost mongodb connection
const uri = "mongodb://localhost:27017";

//moved from server.js
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function runDBConnection() {
	try {
		await client.connect();
		const collection = client.db().collection('Cat');
		console.log("server.js Successfully connected to MongoDB")
        //console.log(collection);
        return collection;
	} catch(ex) {
		console.error("Failed connection to MonboDB:", ex);
	}
}

module.exports = {
    client: client,
    runDBConnection: runDBConnection
};