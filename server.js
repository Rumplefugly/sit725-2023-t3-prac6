var express = require("express")
var app = express()
const catController = require('./controllers/catController');
const { initializeCollection } = require('./models/cat');

// Commented week 5 and moved to dbConnection.js
//const { MongoClient, ServerApiVersion } = require("mongodb");
//Localhost mongodb connection
//const uri = "mongodb://localhost:27017";
var port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Commented week 5 and moved to dbConnection.js
/*const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});*/

app.use(catController);

app.get('/', function (req,res) {
    res.render('index.html');
});

async function startApp() {
    await initializeCollection();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startApp();

// Commented week 5 and moved to catController.js
/*app.get('/api/cats', (req, res) => {
	//console.log("server.js app.get making a getAllCats() request");
	getAllCats((err, cats) => {
		//console.log('server.js getAllCats function called before response');
        if (err) {
			console.log("server.js getAllCats function error");
            res.json({statusCode: 500, message: 'Failed to get cats'});
        } else {
			//console.log("server.js getAllCats function success");
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
    //console.log('server.js function getAllCats(callback) called');
    collection.find({}).toArray()
    .then((docs) => {
        console.log('server.js fetched cats:', docs);
        callback(null, docs);
    })
    .catch((err) => {
        console.error('server.js Failed to find values in mongodb:', err);
        callback(err);
    });
}*/

//app.listen(port,()=>{
//	console.log("App listening to: "+port);
//	runDBConnection();
//})

// Commented week 5 and moved to dbConnection.js
/*app.listen(port, async () => {
	console.log("App listening to:" + port);
	collection = await runDBConnection();
	//console.log(collection);
});*/
