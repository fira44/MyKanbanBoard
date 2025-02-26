import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx';
import CreateBoard from "./CreateBoard.jsx";
import EditTask from './EditTask.jsx';
import './index.css';
import TaskContainer from './TaskContainer.jsx';

const RootComponent = () => {
  const [tasks, setTasks] = useState([]); 
  const [taskBoard, setTaskBoard]= useState({
    backlog : [],
    todo:[],
    inprogress:[],
    designed:[]
})

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="CreateBoard" element={<CreateBoard />} />
        <Route path="task" element={<TaskContainer tasks={tasks} setTasks={setTasks} taskBoard={taskBoard} setTaskBoard={setTaskBoard}/>} />
        <Route path="edit" element={<EditTask tasks={tasks} setTasks={setTasks} taskBoard={taskBoard} setTaskBoard={setTaskBoard} />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<RootComponent />);
