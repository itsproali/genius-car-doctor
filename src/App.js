import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import Required from "./Pages/Required/Required";
import Checkout from "./Pages/Checkout/Checkout";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import Home from "./Pages/Home/Home/Home";
import ServiceDetails from "./Pages/Home/Service/ServiceDetails";
import Services from "./Pages/Home/Services/Services";
import NotFound from "./Pages/NotFound/NotFound";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import Loading from "./Pages/Shared/Loading/Loading";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/service/:serviceId" element={<ServiceDetails />}></Route>
        <Route
          path="/checkout"
          element={
            <Required>
              <Checkout></Checkout>
            </Required>
          }
        ></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
