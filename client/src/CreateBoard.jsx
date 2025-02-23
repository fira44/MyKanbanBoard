import { useRef } from "react";
const CreateBoard = () => {
    const boardnameRef = useRef(null);
    function handleSubmit(event){
        event.preventDefault();
        console.log(boardnameRef.current.value);
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
         <button>CREATE</button>
        </form>
    </div>
    )
}

export default CreateBoard;