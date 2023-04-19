import "./App.css";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="lessons" element={<Lessons />} />
      </Routes>
    </BrowserRouter>
    </AppContainer>
  );
}

export default App;