import room from "../../assets/images/room1.png";
import "../../styles/chapter1Game.css";
import { useEffect, useState, useRef } from "react";

import Objective from "../../components/objective";
import Popup from "../../components/popUp";
import hotspots from "../../data/chapter1Hotspots";
import keyImg from "../../assets/items/rusty-key.png";

import { saveGame } from "../../api/gameApi";

import { useDispatch, useSelector } from "react-redux";
import { showPopup, hidePopup, addClue, getKey, solvePuzzle, nextChapter, startTimer, showWarning, setDiaryRead, setPaintingInspected, setShowKey, setShowGhost } from "../../features/game/gameSlice";

import ambientSound from "../../assets/audio/ambient.mp3";
import whisper from "../../assets/audio/whisper.mp3";

import ghost1 from "../../assets/images/ghost1.png";
import ghost2 from "../../assets/images/ghost2.png";
import DeathScreen from "../../components/deathScreen";
import scream from "../../assets/audio/scream.mp3";

export default function Chapter1Game() {
    const dispatch = useDispatch();
    const { popup, hasKey, puzzleSolved, timer, warningShown, diaryRead, paintingInspected, showKey, showGhost } = useSelector(state => state.game);
    const game = useSelector(state => state.game);

    const [puzzleOpen, setPuzzleOpen] = useState(false);

    const [ghostFrame, setGhostFrame] = useState(1);
    const [deathStage, setDeathStage] = useState(0);

    const [code, setCode] = useState("");
    const ambientRef = useRef(new Audio(ambientSound));
    const whisperRef = useRef(new Audio(whisper));

    const screamRef = useRef(new Audio(scream));

    useEffect(() => {
        screamRef.current.preload = "auto";
        screamRef.current.load();
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            dispatch(startTimer());
        }, 1000);

        return () => clearInterval(timerId);
    }, [dispatch]);

    useEffect(() => {
        ambientRef.current.loop = true;
        ambientRef.current.volume = 0.7;
        ambientRef.current.play().catch(() => { });

        return () => {
            ambientRef.current.pause();
            ambientRef.current.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        if (timer === 60 && !warningShown) {
            dispatch(showWarning());
            dispatch(
                showPopup({
                    title: "⚠ THE GHOST IS NEAR",
                    text: "You hear heavy footsteps...\nEscape before it's too late.",
                    buttonText: "Continue",
                })
            );
        }

        if (timer === 0) {

            whisperRef.current.pause();
            ambientRef.current.pause();

            // 👇 Sound sabse pehle
            screamRef.current.pause();
            screamRef.current.currentTime = 0;
            screamRef.current.play().catch(console.error);

            // 👇 Fir ghost
            setDeathStage(1);

            setTimeout(() => {
                setGhostFrame(2);
            }, 250);

            setTimeout(() => {
                setDeathStage(2);
            }, 2500);
        }
    }, [timer, warningShown, dispatch]);


    useEffect(() => {
        const saveProgress = async () => {
            try {
                await saveGame({
                    currentChapter: game.currentChapter,
                    hasKey: game.hasKey,
                    puzzleSolved: game.puzzleSolved,
                    inventory: game.inventory,
                    clues: game.clues,
                    timer: game.timer,
                    diaryRead: game.diaryRead,
                    paintingInspected: game.paintingInspected,
                    showKey: game.showKey
                });
                console.log("Game Saved");
            } catch (error) {
                console.log(error);
            }
        };
        saveProgress();
    }, [game.currentChapter, game.hasKey, game.puzzleSolved, game.inventory, game.clues, game.diaryRead, game.paintingInspected, game.showKey]);

    const openPopup = (title, text, image, buttonText) => {
        dispatch(
            showPopup({ title, text, image, buttonText })
        );
    };

    const handleHotspotClick = (spot) => {
        console.log("spot", spot)
        switch (spot.type) {
            case "diary":
                dispatch(setDiaryRead())
                openPopup(
                    "OLD DIARY",
                    "",
                    spot.image
                );
                dispatch(addClue("The Painter hides the truth"))
                break;

            case "painting":

                if (!diaryRead) {

                    openPopup(
                        "LOCKED",
                        "Read the diary first."
                    );

                    break;
                }
                console.log("Opening Inspect Popup");
                openPopup(
                    "OLD PAINTING",
                    "This painting looks suspicious.\nThere might be something hidden.",
                    spot.image,
                    "Inspect"
                );

                break;

            case "puzzle":
                if (!paintingInspected) {
                    openPopup(
                        "LOCKED",
                        "You don't know the code yet."
                    );
                    return;
                }
                setPuzzleOpen(true);
                break;

            case "door":
                if (!hasKey) {

                    openPopup(
                        "DOOR LOCKED",
                        "A rusty lock blocks the door."
                    );
                    return;
                }
                openPopup(
                    "CHAPTER COMPLETE",
                    "The old wooden door slowly opens..."
                );
                dispatch(nextChapter());
                break;

            default:
                break;

        }
    };
    console.log("popup stte", popup)
    return (
        <div className="game-container">
            <div className={`room-wrapper ${deathStage > 0 ? "death-mode" : ""}`}>

                <img src={room} className="room-image" alt="" />


                {showKey && !hasKey && (
                    <img
                        src={keyImg}
                        alt="Rusty Key"
                        className="hidden-key"
                        onClick={() => {
                            dispatch(getKey());
                            dispatch(setShowKey(false))
                            openPopup(
                                "RUSTY KEY FOUND",
                                "This ancient key might open the main door.",
                                keyImg
                            );

                        }}
                    />
                )}

                <Objective timer={timer} />
                <Popup
                    show={popup.show}
                    title={popup.title}
                    text={popup.text}
                    image={popup.image}
                    buttonText={popup.buttonText}

                    onAction={() => {
                        console.log("BUTTON CLICKED");
                        if (popup.buttonText === "Inspect") {
                            dispatch(setPaintingInspected())
                            dispatch(
                                showPopup({
                                    title: "SECRET REVEALED",
                                    text: "Secret lies in the painting...",
                                    image: hotspots.find(
                                        x => x.id === "painting"
                                    ).clueImage,
                                    buttonText: "Continue"
                                })
                            );
                        }
                        else {
                            dispatch(hidePopup());
                            if (popup.title === "⚠ THE GHOST IS NEAR") {

                                whisperRef.current.loop = true;
                                ambientRef.current.volume = 0.3
                                whisperRef.current.volume = 0.9;
                                whisperRef.current.play().catch(() => { });
                            }
                        }

                    }}
                />

                {
                    puzzleOpen && !puzzleSolved &&
                    <div className="puzzle">

                        <h4>☠ HIDDEN LOCK ☠</h4>

                        <p>
                            Only the chosen numbers shall break
                            <br />
                            the ancient seal...
                        </p>

                        <div className="code-box">

                            <input
                                type="password"
                                className="horror-input"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="•••"
                                maxLength={3}
                            />

                        </div>

                        <button onClick={() => {
                            if (code === "731") {
                                dispatch(solvePuzzle());
                                setPuzzleOpen(false);
                                dispatch(setShowKey(true))
                                dispatch(
                                    showPopup({
                                        title: "LOCK OPENED",
                                        text: "CLICK...\n\nThe hidden compartment opens."
                                    })
                                );
                            }
                            else {
                                dispatch(
                                    showPopup({
                                        title: "WRONG CODE",
                                        text: "Nothing happens..."
                                    })
                                );
                            }
                        }}>🔓 UNLOCK
                        </button>

                    </div>
                }

                <svg className="hotspot-layer" viewBox="0 0 1365 768" preserveAspectRatio="none">
                    {
                        hotspots.map((spot) => (
                            <rect
                                key={spot.id}
                                className="svg-hotspot"
                                x={spot.x}
                                y={spot.y}
                                width={spot.width}
                                height={spot.height}
                                onClick={() => handleHotspotClick(spot)}
                            />
                        ))
                    }
                </svg>
                {deathStage === 2 && <DeathScreen />}
            </div>
            {deathStage === 1 && (
                <div className="ghost-jumpscare">

                    <img
                        src={ghostFrame === 1 ? ghost1 : ghost2}
                        alt="Ghost"
                        className={ghostFrame === 1 ? "ghost-far" : "ghost-close"}
                    />

                </div>
            )}
        </div>
    );
}