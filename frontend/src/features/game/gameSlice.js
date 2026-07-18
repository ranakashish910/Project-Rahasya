import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    inventory: [],
    clues: [],
    hasKey: false,
    puzzleSolved: false,
    currentChapter: 1,
    timer: 300,
    diaryRead: false,
    paintingInspected: false,
    showKey: false,
    popup: {
        show: false,
        title: "",
        text: "",
        image: null,
        buttonText: "Continue"
    },
    warningShown: false,
    gameOver: false,
}

const gameSlice = createSlice({
    initialState,
    name: "game",

    reducers: {
        addItem: (state, action) => {
            state.inventory.push(action.payload)
        },
        addClue: (state, action) => {
            if (!state.clues.includes(action.payload)) {
                state.clues.push(action.payload)
            }
        },
        getKey: (state) => {
            state.hasKey = true;
            if (!state.inventory.includes("Rusty Key")) {
                state.inventory.push("Rusty Key")
            }
        },
        solvePuzzle: (state) => {
            state.puzzleSolved = true
        },
        nextChapter: (state) => {
            state.currentChapter += 1
        },
        showPopup: (state, action) => {
            state.popup.show = true;
            state.popup.text = action.payload.text;
            state.popup.title = action.payload.title;
            state.popup.image = action.payload.image;
            state.popup.buttonText = action.payload.buttonText || "Continue";
        },
        hidePopup: (state) => {
            state.popup.show = false;
            state.popup.text = "";
            state.popup.title = "";
            state.popup.image = "";
        },
        startTimer: (state) => {
            if (state.timer > 0) {
                state.timer = state.timer - 1;
            }
        },
        resetTimer: (state) => {
            state.timer = 480;
            state.warningShown = false;
            state.gameOver = false
        },
        setDiaryRead: (state) => {
            state.diaryRead = true;
        },

        setPaintingInspected: (state) => {
            state.paintingInspected = true;
        },

        setShowKey: (state, action) => {
            state.showKey = action.payload;
        },
        showWarning: (state) => {
            state.warningShown = true
        },
        setGameOver: (state) => {
            state.gameOver = true
        },
        loadGameState: (state, action) => {
            state.currentChapter = action.payload.currentChapter;
            state.hasKey = action.payload.hasKey;
            state.puzzleSolved = action.payload.puzzleSolved;
            state.inventory = action.payload.inventory;
            state.clues = action.payload.clues;
            state.timer = action.payload.timer;

            state.diaryRead = action.payload.diaryRead;
            state.paintingInspected = action.payload.paintingInspected;
            state.showKey = action.payload.showKey;

        },
        resetGame: () => initialState
    }
})

export const { addItem, addClue, getKey, solvePuzzle, nextChapter, showPopup, hidePopup, startTimer, resetTimer, showWarning,setDiaryRead,setPaintingInspected,setShowKey, setGameOver, resetGame, loadGameState } = gameSlice.actions
export default gameSlice.reducer;