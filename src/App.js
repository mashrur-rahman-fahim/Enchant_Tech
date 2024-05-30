

import { Footer } from "./components/footer/footer";

import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Desktop } from "./pages/Desktop";
import { Laptop } from "./pages/Laptop";
import { Components } from "./pages/Components";
import { Gaming1 } from "./pages/Gaming1";
import { Login2 } from "./pages/Login2";
import { Signup } from "./pages/signup";



function App() {
  return (
   <div>
    <BrowserRouter>
    <Navbar/>
    
    <Routes>

   
   
   <Route path="/" element={<Home/>}/>
   <Route path="/Login" element={<Login2/>}/>
   <Route path="/Desktop" element={<Desktop/>}/>
   <Route path="/Laptop" element={<Laptop/>}/>
   <Route path="/Components" element={<Components/>}/>
   <Route path="/Gaming" element={<Gaming1/>}/>
  <Route path="SignUp" element={<Signup/>}/>

   </Routes>

   <Footer/>
   </BrowserRouter>
   </div>
  );
}

export default App;
