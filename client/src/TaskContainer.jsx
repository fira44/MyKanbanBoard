import { useRef, useState } from "react";


const TaskContainer = () => {
    const [tasks, setTasks] = useState([]);
    const addTask = () =>{
        if (taskRef.current.value.trim() === "") return;
        setTasks([...tasks, taskRef.current.value]);
        taskRef.current.value = ""; // Clear task input 
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
        {tasks.map((task) =>
            <div className="task__card">
                {task}
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