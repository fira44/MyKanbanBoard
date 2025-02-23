import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx';
import CreateBoard from "./CreateBoard.jsx";
import './index.css';


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
   <Routes>
    <Route path = "/" element = { <App/>}>

    </Route>

    <Route path = "CreateBoard" element = {<CreateBoard/>}>

    </Route>
   </Routes>

  </BrowserRouter>
)
