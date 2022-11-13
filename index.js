const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


// MiddleWare 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wn2ha.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect( err =>{
//     const collection = client.db("test").collection("devices");

// console.log("Genius Car DB Connected");

// client.close();

// })

async function run() {
    
    try {
      await client.connect();
      const serviceCollection = client.db("geniusCar").collection("service");


      app.get('/service', async (req , res )=>{
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
      } );

      app.get('/service/:id', async (req , res )=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const service = await serviceCollection.findOne(query);
        res.send(service);
        });

        // App Post:
        app.post('/service', async (req, res) =>{
            const newService = req.body;
            const result = serviceCollection.insertOne(newService);
        })

        // App Delete:
        app.delete('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally{
        
    }  
    }
run().catch(console.dir); 


app.get('/', (req, res) =>{
    res.send("Please Running My Port");
})


app.listen(port, () =>{
    console.log('Listening to port', port)
})
