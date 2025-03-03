import mongoose from "mongoose";

//Board model
const BoardSchema = new mongoose.Schema({
    boardId: {type : String, required : true, unique : true},
    taskBoard : {type : Object}
  })
  
  export default mongoose.model("Board", BoardSchema);