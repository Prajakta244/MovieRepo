var express    = require("express")
var app        = express()
var bodyparser = require("body-parser")
var mongoose   = require("mongoose")

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost/movie_detail",{ useNewUrlParser: true })

//Schema Definition
var movieSchema = new mongoose.Schema({
	name:String,
	image:String,
	summary:String
})

//Creating New Model
var Movie = mongoose.model("Movie",movieSchema)

app.set("view engine", "ejs")

app.get("/",function(req,res){
	res.redirect("/movie")
})

//Fetching all movies from db
app.get("/movie", function(req,res){
	Movie.find({}, function(err,allMovies){
		if(err){
			console.log(err)
		}
		else{
			res.render("movie",{movies : allMovies})	
		}
	})
})

//Inserting movie into db
app.post("/movie",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var summary = req.body.summary;
	var newMovie = {name : name, image : image, summary : summary}
	Movie.create(newMovie, function(err, recentMovie){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/movie")
		}
	})
})
app.get("/movie/new", function(req,res){
	res.render("new")
})

app.listen(8000,()=>{
	console.log("App Begins")
})
