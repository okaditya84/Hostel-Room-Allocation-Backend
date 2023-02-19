const express = require("express");
const cors=require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const allocateRoom = require("./routes/allocateRoom");
const preferredAllocatedRoom = require("./routes/preferredAllocatedRoom");
app.use(cors(
    {
        origin: ["https://dot-slash-frontend-lis5.vercel.app/"],
        credentials:true,
    }
))
app.use(express.json());

app.use("/api/v1", allocateRoom);
app.use("/api/v2", preferredAllocatedRoom);
const {addRooms} = require("./controllers/addRooms")
app.get("/addRooms", addRooms);
const Port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) =>{
    if(err) throw err;
    app.listen(Port, (err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${Port}`);
})
});