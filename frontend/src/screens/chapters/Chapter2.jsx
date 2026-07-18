import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ChaptersStyles/Chapter1.css";

const Chapter2 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/game/chapter2");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="chapter1">
      <h1>CHAPTER II</h1>
      <p>abc</p>
    </div>
  );
};

export default Chapter2;