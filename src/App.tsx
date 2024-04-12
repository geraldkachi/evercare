import "./App.css";
import Welcome from "./file/Welcome";
import GettingStarted from "./components/dashboard/GettingStarted";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useCountStore from "./store/store";

function App() {
  useEffect(() => {
    useCountStore.persist.clearStorage()
  }, [])
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Welcome />} />
        <Route path="/getting-started" element={<GettingStarted />} />
      </Route>
    </Routes>
  );
}

export default App;
