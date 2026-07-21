import { IntroScreen } from "./screens/introScreen"
import Login from "./screens/loginScreen/index.jsx"
import Signup from "./screens/signupScreen/index.jsx"
import ProtectedRoutes from "./components/protectedRoutes/index.jsx"

import { Routes, Route } from "react-router-dom"
import { Menu } from "./screens/mainMenu"
import { StoryScreen } from "./screens/storyScreen"
import "./App.css";
import { LoadingScreen } from "./screens/loadingScreen";
import Chapter1 from "./screens/chapters/Chapter1";
import Chapter1Game from "./screens/game/Chapter1Game.jsx";

import Chapter2 from "./screens/chapters/chapter2.jsx";
import AdminLayout from "./admin/components/AdminLayout.jsx"
import Dashboard from "./admin/screens/Dashboard.jsx"
import Players from "./admin/screens/Players.jsx"

function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<IntroScreen />}></Route>

        <Route path='/login' element={<Login />}></Route>

        <Route path="/admin" element={<AdminLayout />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/admin/players" element={<Players />} />
          {/* <Route path="/admin/chapters" element={<Chapters />} /> */} 

        </Route>


        <Route path='/signup' element={<Signup />}></Route>

        <Route element={<ProtectedRoutes />}>
          <Route path='/story' element={<StoryScreen />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/loading' element={<LoadingScreen />}></Route>
        </Route>

        <Route path='/chapter1' element={<Chapter1 />}></Route>
        <Route path="/game/chapter1" element={<Chapter1Game />} />

        <Route path='/chapter2' element={<Chapter2 />}></Route>
      </Routes>
    </>
  )
}
export default App