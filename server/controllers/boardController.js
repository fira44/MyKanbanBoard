import Board from "../models/Board.js";

//Create a new board
export const createBoard = async (req, res) => {
  try {
    const { boardId, taskBoard } = req.body;
    const newBoard = new Board({ boardId, taskBoard });
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "The Board ID already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

//Get a board by its id
export const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ boardId: req.params.id });
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json({ boardId: board.boardId, taskBoard: board.taskBoard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update a board by its id
export const updateBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { boardId: req.params.id },
      { taskBoard: req.body.taskBoard },
      { new: true }
    );
    if (!board) return res.status(400).json({ message: "Board not found" });
    res.json({ boardId: board.boardId, taskBoard: board.taskBoard });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
