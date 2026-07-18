import diary from "../assets/items/diary.png";
import painting from "../assets/items/painting.png";
import paintingClue from "../assets/items/paintingZoomed.png";
import key from "../assets/items/rusty-key.png";


const hotspots = [

  {
    id: "diary",
    type: "diary",
    x: 196,
    y: 425,
    width: 50,
    height: 30,
    image: diary
  },


  {
    id: "painting",
    type: "painting",
    x: 22,
    y: 100,
    width: 170,
    height: 290,
    image: painting,
    clueImage: paintingClue
  },


  {
    id: "lock",
    type: "puzzle",
    x: 1210,
    y: 280,
    width: 116,
    height: 160
  },

  {
    id: "door",
    type: "door",
    x: 1120,
    y: 200,
    width:90,
    height: 230
  }


];


export default hotspots;