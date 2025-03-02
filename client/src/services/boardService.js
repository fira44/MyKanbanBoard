const BASE_URL = "http://localhost:5000/boards";

export const fetchBoard = async (boardId) => {
    try {
        const response = await fetch(`${BASE_URL}/${boardId}`);
        if (!response.ok) throw new Error("Board not found");
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const createBoard = async (boardId, emptyBoard) => {
    try{
        await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ boardId :  boardId, taskBoard: emptyBoard }),
        })
    }
    catch (error){
        console.error(error);
        throw error;
    }
}
export const updateBoard = async (boardId, newTaskBoard) => {
    try {
        await fetch(`${BASE_URL}/${boardId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskBoard: newTaskBoard }),
        });
    } catch (error) {
        console.error("Error updating board:", error);
        throw error;
    }
};
