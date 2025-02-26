import { useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router";


const TaskContainer = ({tasks, setTasks, taskBoard, setTaskBoard}) => {
    const navigate = useNavigate();
    const categories = ["backlog", "todo", "inprogress" , "designed"]
    const columnNames = {
        backlog : "Backlog",
        todo : "To do",
        inprogress : "In progress",
        designed : "Designed"
    }
    const addTask = () =>{
        if (taskRef.current.value.trim() === "") return;
        const newTask = {text : taskRef.current.value, 
            color : "#C440A1",
        id : Date.now().toString(),
        category : "backlog"}
        setTasks([...tasks, newTask]);
        setTaskBoard((prevTasks) =>({
            ...prevTasks,
            [newTask.category]: [...prevTasks[newTask.category], newTask]
        }));
        taskRef.current.value = " "; // Clear task input 
    }
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const updatedTasks = [...tasks];
        const movedTask = taskBoard[result.source.droppableId].splice((result.source.index), 1)[0];
        setTaskBoard((prevTasks) => ({
            ...prevTasks,
            [movedTask.category]: prevTasks[movedTask.category].filter((tsk) => tsk.id !== movedTask.id),
        }));
        
        const newCategory = result.destination.droppableId;
        movedTask.category = newCategory;
        const updatedBoard = taskBoard[movedTask.category];
        updatedBoard.splice(result.destination.index, 0 , movedTask);
        updatedTasks.splice(result.destination.index, 0, movedTask);
        setTaskBoard((prevTasks) => ({
            ...prevTasks, 
            [movedTask.category] : updatedBoard
        }))
        setTasks(updatedTasks);
    } 
    const deleteTask = (task) =>{
        setTasks(tasks.filter((tsk) => tsk.id !== task.id));
        setTaskBoard((prevTasks) => ({
            ...prevTasks,
            [task.category] : prevTasks[task.category].filter((tsk) => tsk.id !== task.id)
        }))

    }
    const taskRef = useRef(null);
    function handleSubmit(event){
        event.preventDefault();
        console.log(taskRef.current.value);
    }
    return(
   <div> 
    <DragDropContext onDragEnd={onDragEnd}>
     <div className="align">
        {categories.map((category) => (
            <Droppable droppableId={category} key = {category}>
                {(provided) => (
                    <div ref = {provided.innerRef}
                    {...provided.droppableProps}
                    className = {`${category}__container`}
                    >
                        <div className={`${category}__tasks`}>
                         {columnNames[category]}
                        {taskBoard[category].map((task,index) => (
                            <Draggable key = {task.id} index = {index} draggableId= {task.id}>
                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="task"
                                                    >
                                                        <div className="task__card" style={{backgroundColor : task.color}}>
                                                            <div className="task__text">{task.text}</div>
                                                            <button
                                                                className="edit__button"
                                                                onClick={() => navigate(`/edit`, { state: {task,index} })}
                                                            >
                                                                EDIT
                                                            </button>
                                                            <button className="delete__button" style={{position:"absolute", bottom: "5px", left:"5px", backgroundColor: `${task.color}`, width:"5px", height:"10px", alignItems: "center", justifyContent:"center", display:"flex"}} onClick={() => deleteTask(task)}>
                                                                ❌  
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    </div>
                )}
            
            </Droppable>
        ))}
     </div>
    </DragDropContext> 
     <div style={{ position: "absolute", left: "600px", top: "-290px", width : "200px" }}>
        <form className="login__form" onSubmit={handleSubmit}>
         <label htmlFor="task" style={{fontSize : "20px", color : "#ffffff"}}>
             Enter task:
          </label>
          <input id = "task" name = "tash" type="text" required ref = {taskRef} style={{height : "0px"}}>
          </input>
          <button style={{height : "20px", width : "80px", fontSize : "10px", color : ""}} onClick={addTask}>CREATE</button>
        </form>
     </div>
    </div> )
}

export default TaskContainer;