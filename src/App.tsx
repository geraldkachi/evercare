import "./App.css";
import Welcome from "./file/Welcome";
import GettingStarted from "./components/dashboard/GettingStarted";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useCountStore from "./store/store";
import Finish from "./components/finish/Finish";
import RequestASecondOpinion from "./components/finish/RequestASecondOpinion";

function App() {
  // useEffect(() => {
  //   useCountStore.persist.clearStorage()
  // }, [])
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Welcome />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="a-second-opinion" element={<RequestASecondOpinion />} />
        <Route path="finish" element={<Finish />} />
      </Route>
    </Routes>
  );
}

export default App;
