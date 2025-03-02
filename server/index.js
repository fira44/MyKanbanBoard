import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT =  process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("mongo db connected")).catch((error) => console.log(error));

const BoardSchema = new mongoose.Schema({
  boardId: {type : String, required : true, unique : true},
  taskBoard : {type : Object}
})

const Board = mongoose.model("Board", BoardSchema);

//Create a new board
app.post("/boards", async (req,res) => {
  try{
    const {boardId, taskBoard} = req.body;
    const newBoard = new Board({boardId, taskBoard});
    await newBoard.save();
    res.status(201).json(newBoard);
  }
  catch (error){
    if (error.code === 11000){
      res.status(400).json({error : "The Boardid already exists"});
    }
    else{
      res.status(400).json({error : error.message});
    }
  }
})

//Find a board with its id
app.get("/boards/:id", async(req,res) => {
  try{
    const board = await Board.findOne({boardId : req.params.id});
    if (!board) return res.status(404).json({message : "board not found"});
    console.log(board);
    res.json({boardId : board.boardId, taskBoard : board.taskBoard});
  }
  catch(error){
    res.status(400).json({error : error.message});
  }
})

//Update a board with its id
app.put("/boards/:id", async(req,res) =>{
  try{
    const board = await Board.findOneAndUpdate({
      boardId : req.params.id},
      {taskBoard : req.body.taskBoard},
      {new : true}
      );
    if (!board) return res.status(400).json({ message: "Board not found" });
    res.json({boardId : board.boardId, taskBoard : board.taskBoard});
  }
  catch(error){
    res.status(400).json({error : error.message});
  }
})

//Check if the server is running.
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})