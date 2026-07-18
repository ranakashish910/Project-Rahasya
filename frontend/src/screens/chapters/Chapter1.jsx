import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/chaptersStyles/Chapter1.css"

const Chapter1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/game/chapter1");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="chapter1">
      <h1>CHAPTER I</h1>
      <p>The Abandoned Room</p>
    </div>
  );
};

export default Chapter1;