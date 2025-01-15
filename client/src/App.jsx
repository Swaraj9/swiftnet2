import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import Home from "./pages/home";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
