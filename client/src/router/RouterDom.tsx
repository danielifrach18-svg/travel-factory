import { Routes, Route } from "react-router-dom";
import { Main } from "../components/main/MainPage";
import { AnimalDetails } from "../components/main/AnimalDetails";

const RouterDom = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/animals/:id" element={<AnimalDetails />} />
    </Routes>
  );
};
export default RouterDom;
