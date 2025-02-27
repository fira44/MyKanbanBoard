import { useRef } from "react";
import { useNavigate } from "react-router";

const CreateBoard = ({taskBoard, setTaskBoard}) => {
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
        await createBoard();
        console.log(boardnameRef.current.value);
    }
    const createBoard = async () => {
        setTaskBoard(emptyBoard);
        await fetch(`http://localhost:5000/boards`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ boardId :  boardnameRef.current.value, taskBoard: emptyBoard }),
    })
    const boardname = boardnameRef.current.value;
    navigate("/task", {state : {boardname}});
}
    return (
    <div className="create_board">
        <div className="top-left"> Arif Evren</div>
        <form className="login__form" onSubmit={handleSubmit}>
         <label htmlFor="boardname">
            Enter board name:
         </label>
         <input id = "boardname" name = "boardname" type="text" required ref = {boardnameRef}>
         </input>
         <button onClick={handleSubmit} >CREATE onClick</button>
        </form>
    </div>
    )
}

export default CreateBoard;