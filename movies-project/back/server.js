const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const PORT= 3000

let ids = 3

const movies = [
    {
      id: 0,
      name: 'Harry Potter',
      genre: 'Magic',
      length: 126,
      image: '../../assets/images/harry.png'
    },
    {
      id: 1,
      name: 'Naruto',
      genre: 'Action',
      length: 150,
      image:  '../../assets/images/naruto.png'
    },
    {
      id: 2,
      name: 'One Piece',
      genre: 'Adventure',
      length: 175,
      image:  '../../assets/images/lofi.png'
    },
    
  ]

  // for parsing and delevering the json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}) );

  // for google auth and allowing passing headers from server to app
  app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });


  
app.get('/', (req, res) => {
    res.send({
        msg: 'Welcome to Movies Backend'
    })
})

app.get('/movies', (req, res) => {
    res.send(movies)
})
app.get('/getMovie/:id', (req, res) => {
    const movie = movies.find( (movie) => movie.id == req.params.id)
    res.send(movie)
})

app.post('/addMovie', (req, res) => {
    req.body.id = ids++
    movies.push(req.body)
})

app.put('/updateMovie/:id', (req, res) => {
    let movie = req.body
    let selectedMovie = movies.find( (movie) => movie.id == req.params.id) 
    if(movie){
        selectedMovie.genre = movie.genre
        selectedMovie.length = movie.length
        selectedMovie.name = movie.name
    }
    res.redirect('http://localhost:4200')
})

app.delete('/deleteMovie/:id', (req, res) => {
    movies.splice(req.params.id  ,1 )
})

 

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})