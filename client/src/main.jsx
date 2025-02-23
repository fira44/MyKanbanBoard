import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx';
import CreateBoard from "./CreateBoard.jsx";
import './index.css';
import Task from "./Task.jsx";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
   <Routes>
    <Route path = "/" element = { <App/>}>

    </Route>

    <Route path = "CreateBoard" element = {<CreateBoard/>}>

    </Route>

    <Route path = "task" element = {<Task/>}></Route>
   </Routes>

  </BrowserRouter>
)
