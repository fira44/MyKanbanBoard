import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useLocation, useNavigate } from "react-router";
import { fetchBoard, updateBoard } from "../services/boardService.js";
import { TaskColumn } from "./TaskColumn.jsx";


const Tasks = ({taskBoard, setTaskBoard}) => {
    const location = useLocation();
    const {boardname} = location.state;
    const navigate = useNavigate();

    //Load board data from database
    useEffect(() => {
        const loadBoard = async () => {
            try {
                const data = await fetchBoard(boardname);
                setTaskBoard(data.taskBoard); 
            } catch (error) {
                setError(error.message); 
                console.error(error);
            }
        };
        loadBoard();
    }, []); 
   
    //Task categories
    const categories = ["backlog", "todo", "inprogress" , "designed"]

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const movedTask = taskBoard[result.source.droppableId].splice((result.source.index), 1)[0]; 
        deleteTask(movedTask);   //Delete the task from the previous category
        const newCategory = result.destination.droppableId;
        movedTask.category = newCategory;
        const updatedBoard = taskBoard[movedTask.category];

        //Update the indexes of tasks in a category
        updatedBoard.splice(result.destination.index, 0 , movedTask);
        setTaskBoard((prevTasks) => ({
            ...prevTasks, 
            [movedTask.category] : updatedBoard
        }))
        updateBoard(boardname, taskBoard);  //Update database
    } 
    // Delete a task
    const deleteTask = (task) => {
        setTaskBoard((prevTasks) => {
            const updatedBoard = {
                ...prevTasks,
                [task.category]: prevTasks[task.category].filter((tsk) => tsk.id !== task.id),
            };
            updateBoard(boardname, updatedBoard);
            return updatedBoard;
        });
    };

    return(
   <div> 
    <DragDropContext onDragEnd={onDragEnd}>
     <div className="align">
        {categories.map((category) => (
            <TaskColumn category={category} taskBoard={taskBoard} deleteTask={deleteTask} boardname={boardname} > </TaskColumn>
        ))}
     </div>
    </DragDropContext> 
    <div style={{ position: "relative" }}>
        <button 
        style={{
            position: "absolute",
            left: "500px", 
            top: "-520px", 
            width: "150px", 
            height: "80px", 
            fontSize: "10px", 
            backgroundColor : "green"
        }} 
        onClick={() => navigate("/addtask", {state : {boardname}})}
        >
         ADD TASK
        </button>
    </div>
    </div> 
    )
}

export default Tasks;