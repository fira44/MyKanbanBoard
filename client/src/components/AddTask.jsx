import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { updateBoard } from "../services/boardService";

export const AddTask = ({setTaskBoard, taskBoard}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {boardname} = location.state;
    const [text, setText] = useState();
    const [color, setColor] = useState("black");
    const [title, setTitle] = useState();
    const [category, setCategory] = useState("backlog");

    const addTask = async () =>{
        const newTask = {text : text, 
        color : color, 
        id : Date.now().toString(),
        category : category,
        title : title}
        const updatedTasks = {
            ...taskBoard,
            [newTask.category]: [...taskBoard[newTask.category], newTask]
        };
        setTaskBoard((prevTasks) =>({
            ...prevTasks,
            [newTask.category]: [...prevTasks[newTask.category], newTask]
        }))
        await updateBoard(boardname,updatedTasks); 
    }

    const handleSubmit = () => {
        addTask();
        navigate(-1);
    }

    return (
        <div className="add__task">
            <h2>ADD TASK</h2>           
            <label htmlFor="titleInput"> Enter task title </label>
            <input id = "titleInput" value = {title} onChange={(e) => setTitle(e.target.value)}></input>
            <label htmlFor="textInput"> Enter task text </label>
            <input type="text" class id = "textInput" value = {text} onChange={(e) => setText(e.target.value)}></input>
            <label htmlFor="colorInput"> Set color</label>
            <input style = {{width : "60px", backgroundColor : color}} type = "color" value = {color} onChange={(e) => setColor(e.target.value)}></input>
            <select id="category" onChange={(e) => setCategory(e.target.value)}>
                <option value=""> Category</option>
                <option value="backlog">Backlog</option>
                <option value="todo"> ToDo</option>
                <option value="inprogress">In Progress</option>
                <option value="designed">Designed</option>
            </select>
            <button onClick={handleSubmit} style={{backgroundColor : "purple", padding : "20px 30px", margin :"10px"}}> ADD</button>
            <button style={{backgroundColor : "red"}} onClick={() => navigate(-1)}> CANCEL</button>
            
        </div>
    )
}