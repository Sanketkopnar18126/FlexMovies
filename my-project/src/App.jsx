import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/index.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Home } from "../src/Components/Home/Home";
import {Details} from "../src/Components/Details/Details"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="/details" element={<Details/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
