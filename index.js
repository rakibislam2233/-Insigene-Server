
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
//middleware
app.use(express.json());
app.use(cors());
//mongodb code here
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASSWORD}@cluster0.dqrkm9l.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dbConnect = async () => {
  try {
    client.connect();
    console.log("Database Connected Successfully✅");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();
const BlogCollections = client.db("insigene").collection("blog");
  //post a new blog on the database
  app.post("/addBlogs",async(req,res)=>{
    const blog = req.body;
    const result = await BlogCollections.insertOne(blog);
    res.send(result);
  })
  // get all blog on the database
  app.get("/getBlogs",async(req,res)=>{
    const result = await BlogCollections.find().toArray();
    res.send(result);
  })
  //delete a blog on the database
  app.delete("/deleteBlogs/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const query = {_id: new ObjectId(id)};
    console.log(query);
    const result = await BlogCollections.deleteOne(query);
    console.log(result);
})
app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
