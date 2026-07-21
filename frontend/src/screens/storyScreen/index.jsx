import { TypeAnimation } from "react-type-animation";
import storyImg from "../../assets/images/storyImg.png";
import { CustomButton } from "../../components/customButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../../styles/StoryScreen.css'
import typingSound from "../../assets/audio/typingSound.mp3";

export const StoryScreen = () => {
    const navigate = useNavigate()
    const handleUnderstand = () => {
        navigate({
            pathname: '/menu'
        })
    }
    useEffect(() => {
        const audio = new Audio(typingSound);
        audio.loop = true;
        audio.volume = 0.7;
        audio.play();
        const timer = setTimeout(() => {
            audio.pause();
        }, 28017);

        return () => {
            clearTimeout(timer);
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);
    return (
        <div className="parent">
            <div className="storyPage">
                <div className="storyCard">
                    <h2>THE STORY</h2>
                    <hr className="line" />
                    <div className="storyText">

                        <TypeAnimation
                            sequence={[
                                `In the heart of an abandoned Haveli, there lies a secret that was never meant to be uncovered...Years ago, a powerful ritual was performed to keep an ancient evil bound. But when greed and betrayal took over, the ritual was left incomplete...Now, the spirit roams free, cursed to protect what was hidden.You are here for answers, but the Haveli has other plans.Find the key... Solve the puzzles.Avoid the spirit! Escape before midnight.`,
                            ]}
                            speed={30}
                            cursor={true}
                            wrapper="div"
                            style={{
                                color: "smoke"
                            }}
                        />

                    </div>
                </div>
                <CustomButton
                    className="storyBtn"
                    text="I UNDERSTAND"
                    onClick={handleUnderstand}
                />
            </div>
        </div>
    );
};