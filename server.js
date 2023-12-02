var express = require("express")
var app = express()

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://localhost:27017";
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
		console.log(collection);
		console.log("Successfully connected to MongoDB")
	} catch(ex) {
		console.error("Failed connection to MonboDB:", ex);
	}
}

app.get('/', function (req,res) {
	res.render('index.html');
});

app.get('/api/cats', (req,res) => {
    getAllCats((err,result)=>{
        if (err) {
            console.error('Failed to return values:', err);
            res.json({statusCode: 500, message: 'Failed to return values'});
        } else {
            res.json({statusCode: 200, data: result, message:"get all cats successful"});
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
    collection.find({}).toArray(callback);
}

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