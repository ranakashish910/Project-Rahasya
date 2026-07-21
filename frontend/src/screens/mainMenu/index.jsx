import '../../styles/MenuScreen.css'
import menuVideo from '../../assets/videos/menuBgVdo.mp4'
import { CustomButton } from "../../components/customButton";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loadGameState } from "../../features/game/gameSlice";
import { loadGame } from '../../api/gameApi';
export const Menu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleContinue = async () => {
        try {
            const data = await loadGame();
            dispatch(loadGameState(data));
            if (data.currentChapter === 1) {
                navigate("/chapter1");
            }
            else if (data.currentChapter === 2) {
                navigate("/chapter2");
            }
            else if (data.currentChapter === 3) {
                navigate("/chapter3");
            }
        } catch (error) {
            alert("No saved game found");
        }
    }

    const handleStory = () => {
        navigate({
            pathname: '/story'
        })
    }
    const handleNewGame = () => {
        navigate({
            pathname: '/loading'
        })
    }
    const handleExit = () => {
        localStorage.removeItem("token")

        navigate('/login')
    }
    return (
        <div className='parentDiv' >
            <video src={menuVideo} autoPlay muted loop className='bgVdo'></video>
            <div className='child'>
                <h1 className="title">
                    <span>R</span>
                    <span>A</span>
                    <span>H</span>
                    <span className="red">A</span>
                    <span>S</span>
                    <span>Y</span>
                    <span>A</span>
                </h1>

                <div className="menuCard">
                    <CustomButton className="btn" text="Continue" onClick={handleContinue} />
                    <CustomButton className="btn" text="Story" onClick={handleStory} />
                    <CustomButton className="btn" text="New Game" onClick={handleNewGame} />
                    <CustomButton className="btn" text="Chapters" />
                    <CustomButton className="btn" text="Feedback" />
                    <CustomButton className="btn" text="Exit Game" onClick={handleExit} />
                </div>
            </div>

        </div>
    )
}