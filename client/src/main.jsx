import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx';
import { AddTask } from './components/AddTask.jsx';
import CreateBoard from "./components/CreateBoard.jsx";
import EditTask from './components/EditTask.jsx';
import Tasks from './components/Tasks.jsx';
import './index.css';

const RootComponent = () => {
  const [taskBoard, setTaskBoard]= useState({
    backlog : [],
    todo:[],
    inprogress:[],
    designed:[]
})

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<CreateBoard setTaskBoard={setTaskBoard}/>} />
        <Route path="task" element={<Tasks taskBoard={taskBoard} setTaskBoard={setTaskBoard}/>} />
        <Route path="edit" element={<EditTask taskBoard={taskBoard} setTaskBoard={setTaskBoard} />} />
        <Route path="addtask" element={<AddTask setTaskBoard={setTaskBoard} />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<RootComponent />);
