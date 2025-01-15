import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Home from "./pages/home";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<Landing />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
