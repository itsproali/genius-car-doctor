const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://itsproali:${process.env.DB_PASS}@cluster1.jggf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client
      .db("GeniusCarDoctor")
      .collection("services");

    const orderCollection = client.db("GeniusCarDoctor").collection("orders");

    //   Load All Services
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //   Load a service
    app.get("/service/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    // Update a service
    app.put("/service/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const service = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: service.name,
          price: service.price,
          description: service.description,
        },
      };
      const updatedService = await serviceCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(updatedService);
    });

    // Delete a service
    app.delete("/service/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    });

    // Get Order Info
    app.post("/order", async (req, res) => {
      const query = req.body;
      const order = await orderCollection.insertOne(query);
      res.send(order);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Genius Server Running");
});

app.listen(port, () => {
  console.log("Listening from: ", port);
});
