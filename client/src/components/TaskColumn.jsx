import { Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router";

export const TaskColumn = ({category, taskBoard, deleteTask,boardname}) => {
    const navigate = useNavigate();
    const columnNames = {
        backlog : "Backlog",
        todo : "To do",
        inprogress : "In progress",
        designed : "Designed"
    }
    return (
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
                                                            <div className = "task__title"> {task.title}</div>
                                                            <div className="task__text">{task.text}</div>
                                                            <button
                                                                className="edit__button"
                                                                onClick={() => navigate(`/edit`, { state: {task,index, boardname} })}
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
    )
}