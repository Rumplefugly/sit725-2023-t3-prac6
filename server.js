var express = require("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
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
]

app.get('/api/projects',(req,res) => {
	res.json({statusCode: 200, data: cardList, message:"Success"})
	})

var port = process.env.port || 3000;

app.listen(port,()=>{
	console.log("App listening to: "+port)
})