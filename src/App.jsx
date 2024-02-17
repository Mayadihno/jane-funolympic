import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PRoute from "./ProtectedRoute/Route";
import Dashboard from "./Admin/Dashboard";
import Gallery from "./Gallery/Gallery";
import Video from "./Videos/Video";
import Fixture from "./Fixtures/Fixture";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PRoute />}>
          <Route path="/*/dashboard" element={<Dashboard />} />
          <Route path="/*/gallery" element={<Gallery />} />
          <Route path="/*/video" element={<Video />} />
          <Route path="/*/fixtures" element={<Fixture />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" position="bottom-center" />
    </>
  );
}

export default App;
