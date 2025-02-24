import { useRef } from "react";
import { useNavigate } from "react-router";


const TaskContainer = ({tasks, setTasks}) => {
    const navigate = useNavigate();
    const addTask = () =>{
        if (taskRef.current.value.trim() === "") return;
        const newTask = {text : taskRef.current.value, color : "#C440A1"}
        setTasks([...tasks, newTask]);
        taskRef.current.value = " "; // Clear task input 
    }
    const taskRef = useRef(null);
    function handleSubmit(event){
        event.preventDefault();
        console.log(taskRef.current.value);
    }
    return(
    <div> 
     <div className="align">
      <div className="backlog__wrapper"> 
       <div className="backlog__container backlog__tasks"> BACKLOG 
        {tasks.map((task, index) =>
            <div className="task__card" style={{backgroundColor : task.color}}>
             <div className="task__text" >{task.text}</div>   
             <button className="edit__button" onClick={() => navigate(`/edit`, {state : {task,index}})}>EDIT </button>
            </div> 
        )}
       </div>
      </div>
       <div className="backlog__container"> FLDSKKL </div>
       <div className="backlog__container"> BACKLOG </div>
       <div className="backlog__container"> BACKLOG </div>
     </div>
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
    </div>

    )
}

export default TaskContainer;