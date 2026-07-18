import axios from "axios";

export const saveGame = async (gameData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No Token Found");
        return;
    }
    const response = await axios.post(
        "http://localhost:3000/api/game/save",
        gameData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
    }
    );
    return response.data;
};

export const loadGame = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
        "http://localhost:3000/api/game/load",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};