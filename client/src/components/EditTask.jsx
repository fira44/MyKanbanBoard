import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBoard } from "../services/boardService";

const EditTask = ({taskBoard, setTaskBoard}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { task,index, boardname} = location.state; 
    const [newText, setNewText] = useState(task.text);
    const [newColor, setNewColor] = useState(task.color);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleSave = async () => {
        const updatedTasks = [...taskBoard[task.category]];
        const newTask = {text : newText, color : newColor, id : task.id, category : task.category, title : newTitle}
        updatedTasks[index] = newTask;
        setTaskBoard((prevTasks) =>({
            ...prevTasks,
            [task.category] : updatedTasks
        }));
        await updateBoard(boardname, { //update database
            ...taskBoard, 
            [task.category]: updatedTasks
        });
        navigate(-1); 
        return taskBoard;
    };  

    return (
        <div>
            <h2>Edit Task</h2>
            <div style={{flexDirection: "column", display : "flex", margin : "10px"}}>
                <label htmlFor="newTitle"> Enter new title </label>
                <input id = "newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <label htmlFor="newText"> Enter new text </label>
                <input id = "newText" value={newText} onChange={(e) => setNewText(e.target.value)} />
            </div>
            <input value = {newColor} type = "color" onChange={(e) => setNewColor(e.target.value)} />
            <button style={{backgroundColor:"purple", margin : "10px"}} onClick={handleSave}>Save</button>
            <button style={{backgroundColor:"red"}} onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

export default EditTask;
