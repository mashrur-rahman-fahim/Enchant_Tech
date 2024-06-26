

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
import { Product } from "./pages/Product";
import { About } from "./pages/About";
import { Contact1 } from "./pages/Contact1";
import { Cart_button } from "./components/cart/Cart_button";
import { Cart_page } from "./pages/Cart_page";
import { CartProvider } from "./components/cart/CartContext";





function App() {
  return (
   <div>
    <CartProvider>
    <BrowserRouter>
    <Navbar/>
    <Cart_button/>
    <Routes>

   
   
   <Route path="/" element={<Home/>}/>
   <Route path="/Login" element={<Login2/>}/>
   <Route path="/Desktop" element={<Desktop/>}/>
   <Route path="/Laptop" element={<Laptop/>}/>
   <Route path="/Components" element={<Components/>}/>
   <Route path="/Gaming" element={<Gaming1/>}/>
  <Route path="/SignUp" element={<Signup/>}/>
  <Route path="/:id" element={<Product/>}/>
  <Route path="/About" element={<About/>}/>
  <Route path="/Contact" element={<Contact1/>}/>
   <Route path="/Cart" element={<Cart_page/>}/>


   </Routes>
   

   <Footer/>
   </BrowserRouter>
   </CartProvider>
   </div>
  );
}

export default App;
