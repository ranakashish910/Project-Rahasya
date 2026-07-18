import { Container } from "react-bootstrap";
import "../../styles/IntroScreen.css";
import {useNavigate} from "react-router-dom"
import { CustomButton } from "../../components/customButton";

export const IntroScreen = () => {
  const navigate=useNavigate()
  const handleStart=()=>{
    navigate({
      pathname:"/login"
    })
  }
  return (
    <Container fluid className="intro p-0">
      <div className="bg">
        <div className="text">
          <h1 className="title">
            <span>R</span>
            <span>A</span>
            <span>H</span>
            <span className="red">A</span>
            <span>S</span>
            <span>Y</span>
            <span>A</span>
          </h1>
          <h6 className="subtitle">
            ESCAPE BEFORE MIDNIGHT
            <hr className="line"/>
          </h6>
          <CustomButton onClick={handleStart} className="btn1" text="Begin Your Escape"/>
        </div>

      </div>

    </Container>
  );
};