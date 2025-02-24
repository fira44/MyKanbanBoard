import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditTask = ({tasks, setTasks}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { task, index} = location.state; 
    const [newText, setNewText] = useState(task.text);
    const [newColor, setNewColor] = useState(task.color);

    const handleSave = () => {
        const updatedTasks = [...tasks];
        const newTask = {text : newText, color : newColor}
        updatedTasks[index] = newTask;
        setTasks(updatedTasks); 
        navigate(-1); 
    };

    return (
        <div>
            <h2>Edit Task</h2>
            <input value={newText} onChange={(e) => setNewText(e.target.value)} />
            <input value = {newColor} type = "color" onChange={(e) => setNewColor(e.target.value)} />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

export default EditTask;
