import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/LoadingScreen.css'
import loadingBg from '../../assets/images/loadingBg.png'

export const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    navigate("/chapter1");
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        return () => {
            clearInterval(timer);
        };
    }, [navigate]);

    return (
        <div className="loadingContainer" style={{
            backgroundImage: `url(${loadingBg})`
        }}>
            <h1>RAHASYA</h1>
            <h3>Loading... {progress}%</h3>
            <div className="progressBar">
                <div
                    className="progressFill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <p> "Every step echoes with a secret..."</p>
        </div>
    );
};