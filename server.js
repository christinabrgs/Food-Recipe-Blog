const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://christinabrgs:Breakingwith@cluster0.qia0kni.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true }) // client grabs input data and stores on mongo website
    .then(client => {
        const foodCollection = client.db("food").collection("food");
        app.set('view engine', 'ejs')

        app.use(express.static('public')) // serves static files in public folder i.e js
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
        app.use(cors())

        // const food = {
        //     'tacos': {
        //         'recipe': 'https://tasty.co/recipe/chicken-fajita-tacos',
        //         'icon': '🌮',
        //         'image': 'taco.png'
        //     },
        //     'tamale':{
        //         'recipe': 'https://tasty.co/recipe/mexican-red-pork-tamales-as-made-by-edna-peredia',
        //         'icon': '🫔',
        //         'image': 'tamales.png' 
        //     },
        //     'burrito':{
        //         'recipe': 'https://tasty.co/recipe/chicken-rice-bean-burritos',
        //         'icon': '🌯',
        //         'image': 'burrito.png'
        //     }
        // }

        app.get('/', async (request, response) => {
            // const food = await foodCollection.find().toArray()
            // console.log(food)
            response.render('index.ejs')
        })

        // can also be used to serve js file rather than express.static but express is the better option
        // app.get('/js', (request, response)=>{
        //     response.sendFile(__dirname + '/main.js')
        // })

        // app.get('/api/:name', (request, response) => {
        //     const foodName = request.params.name.toLowerCase()

        //     if (food[foodName]) {
        //         response.json(food[foodName])
        //     }
        //     else{
        //     response.json(food['unknown'])
        //     }

        // })

        app.post('/search', async(req, res) => {
            console.log('body', req.body)

            const food = await foodCollection.find({name: new RegExp(req.body.food, 'i') }).toArray()
            console.log(food)
            res.render('index.ejs', { food })
        })

        app.listen(process.env.PORT || PORT, () => {
            console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
        })
    })