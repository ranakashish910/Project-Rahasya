import '../../styles/objective.css'

import { FaBullseye, FaKey } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { useSelector } from "react-redux";

const Objective = ({ timer }) => {

    const inventory = useSelector(state => state.game.inventory);
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return (
        <div className="top-hud">
            <div className="hud-objective">
                <FaBullseye />
                <span>
                    Leave before she finds you.
                </span>
            </div>
            <div className="hud-timer">
                <MdTimer />
                <span>
                    {minutes}:{seconds.toString().padStart(2,"0")}
                </span>
            </div>
            <div className="hud-inventory">
                {
                    inventory.length===0?
                    <span>Empty</span>:
                    inventory.map((item,index)=>
                        <FaKey key={index}/>
                    )
                }
            </div>
        </div>
    );
}
export default Objective;