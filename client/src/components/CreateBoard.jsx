import { useRef } from "react";
import { useNavigate } from "react-router";
import { createBoard } from "../services/boardService";

const CreateBoard = ({setTaskBoard}) => {
    const emptyBoard = {
        backlog: [],
        todo: [],
        inprogress: [],
        designed: []
    };
    const boardnameRef = useRef(null);
    const navigate = useNavigate();
    async function handleSubmit(event){
        event.preventDefault();
        setTaskBoard(emptyBoard); // Create an empty task board.
        const boardname = boardnameRef.current.value;
        await createBoard(boardname , emptyBoard);
        navigate("/task", {state : {boardname}});
    }

    return (
    <div className="create__board">
        <div className="top-left"> Arif Evren</div>
        <form className="login__form" onSubmit={handleSubmit}>
         <label htmlFor="boardname">
            Enter board name:
         </label>
         <input id = "boardname" name = "boardname" type="text" required ref = {boardnameRef}>
         </input>
         <button onClick={handleSubmit} >CREATE A BOARD</button>
        </form>
    </div>
    )
}

export default CreateBoard;