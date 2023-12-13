var express = require("express")
var app = express()

const { MongoClient, ServerApiVersion } = require("mongodb");
//Localhost mongodb connection
const uri = "mongodb://localhost:27017";
//Atlas mongodb connection
//const uri = "mongodb+srv://sit725:X0vmdHYKxDma8Ovb@test.vhgjzba.mongodb.net/?retryWrites=true&w=majority";
var port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
		collection = client.db().collection('Cat');
		//console.log(collection);
		console.log("server.js Successfully connected to MongoDB")
	} catch(ex) {
		console.error("Failed connection to MonboDB:", ex);
	}
}

app.get('/', function (req,res) {
	res.render('index.html');
});

app.get('/api/cats', (req, res) => {
	console.log("server.js app.get making a getAllCats() request");
	getAllCats((err, cats) => {
		console.log('server.js getAllCats function called before response');
        if (err) {
			console.log("server.js getAllCats function error");
            res.json({statusCode: 500, message: 'Failed to get cats'});
        } else {
			console.log("server.js getAllCats function success");
            res.json({statusCode: 200, data: cats});
        }
    });
});

app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postCat(cat,callback) {
    collection.insertOne(cat, (err, result) => {
		if (err) {
			console.error('Failed to insert value to mongodb:', err);
		}
		callback(err, result);
	});
}

function getAllCats(callback){
    console.log('server.js function getAllCats(callback) called');
    //console.log('Collection:', collection);
    collection.find({}).toArray()
    .then((docs) => {
        console.log('server.js fetched cats:', docs);
        callback(null, docs);
    })
    .catch((err) => {
        console.error('server.js Failed to find values in mongodb:', err);
        callback(err);
    });
}

/*function getAllCats(callback){
	console.log('server.js function getAllCats(callback) called');
    //collection.find({}).toArray(callback);
	console.log('Collection:', collection);
	collection.find({}).toArray((err, docs)=>{
		if (err) {
			console.error('server.js Failed to find values in mongodb:', err);
		} else {
			console.log('server.js fetched cats:', docs);
		}
		callback(err, docs);
	});
}*/


/*function getAllCats(callback){
	console.log("Function getAllCats called");
    collection.find({}).toArray(callback);
	console.log("collection find function returned");
}*/

/*const cardList = [
	{
		title: "Kitten 2",
		image: "images/kitten2.png",
		link: "About Kitten 2",
		desciption: "Meow meow meow meow meow!"
	},
	{
		title: "Kitten 3",
		image: "images/kitten3.png",
		link: "About Kitten 3",
		desciption: "Meow meow meow meow meow meow meow meow meow meow!"
	}
]*/

/*app.get('/api/projects',(req,res) => {
	res.json({statusCode: 200, data: cardList, message:"Success"})
	})*/

app.listen(port,()=>{
	console.log("App listening to: "+port);
	runDBConnection();
})