// file: D:/web_app/Enchant_Tech/frontend/src/App.js

import React from "react";
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Desktop } from "./pages/Desktop";
import { Laptop } from "./pages/Laptop";
import { Motherboardnew } from "./pages/Motherboardnew"; // Assuming Motherboard is in the pages folder
import { Keyboard2 } from "./pages/Keyboard2";
import { Printer2 } from "./pages/Printer2";
import { Casing2 } from "./pages/Casing2";
import { Mouse2 } from "./pages/Mouse2";
import { Ups2 } from "./pages/Ups2";
import { Powersupply2 } from "./pages/Powersupply2";
import { Speaker2 } from "./pages/Speaker2";
import { Gaming1 } from "./pages/Gaming1";
import { Login2 } from "./pages/Login2";
import { Signup } from "./pages/signup";
import { Product } from "./pages/Product";
import { About } from "./pages/About";
import { Contact1 } from "./pages/Contact1";
import { Cart_button } from "./components/cart/Cart_button";
import { Cart_page } from "./pages/Cart_page";
import { CartProvider } from "./components/cart/CartContext";
import { Auth1 } from "./pages/Auth1";
import { AuthProvider, useAuth } from "./components/Authentication/AuthContext";
import { Login1 } from "./components/Login/login";
import { Admin1 } from "./pages/Admin1";
import { PCBuild } from "./pages/PCBuild";
import { Payment1 } from "./pages/Payment1";
import { Admin_pDelete } from "./pages/Admin_pDelete";
import { GamingLaptop } from "./pages/GamingLaptop";
import { AllDesktop } from "./pages/AllDesktop";
import { LaptopAll } from "./pages/LaptopAll";
import { Components2 } from "./pages/Components2";
import { LoginProvider } from "./components/Authentication/LoginContest";
import { ProfilePage } from "./pages/ProfilePage";
import { Main__profile } from "./pages/Main__profile";
import { Main_profile } from "./components/Profile/Main_profile";
import { Cpu2 } from "./pages/Cpu2";
import { Storage2 } from "./pages/Storage2";
import { Cooler1 } from "./pages/Cooler1";
import { Gpu2 } from "./pages/Gpu2";
import { Ram2 } from "./pages/Ram2";

function App() {
  return (
    <LoginProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login2 />} />
                <Route path="/Login1" element={<Login1 />} />
                <Route path="/Desktop" element={<Desktop />} />
                <Route path="/Laptop" element={<Laptop />} />
                <Route path="/Rambuild" element={<Ram2 />} />
                <Route path="/Storagebuild" element={<Storage2 />} />
                <Route path="/Gpubuild" element={<Gpu2 />} />
                <Route path="/Motherboardbuild" element={<Motherboardnew />} />
                <Route path="/Keyboardbuild" element={<Keyboard2 />} />
                <Route path="/Printerbuild" element={<Printer2 />} />
                <Route path="/Casingbuild" element={<Casing2 />} />
                <Route path="/Powersupplybuild" element={<Powersupply2 />} />
                <Route path="/Speakerbuild" element={<Speaker2 />} />
                <Route path="/Mousebuild" element={<Mouse2 />} />
                <Route path="/Upsbuild" element={<Ups2 />} />

                <Route path="/Coolerbuild" element={<Cooler1 />} />
                <Route path="/Cpubuild" element={<Cpu2 />} />
                <Route path="/Gaming" element={<Gaming1 />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/:id" element={<Product />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact1 />} />
                <Route path="/Cart" element={<Cart_page />} />
                <Route path="/Auth/:email" element={<Auth1 />} />
                <Route
                  path="/Admin"
                  element={<PrivateRoute component={Admin1} />}
                />
                <Route path="/PCBuilder" element={<PCBuild />} />
                <Route path="/Payment-option" element={<Payment1 />} />
                <Route path="/catagory/:catagory" element={<Admin_pDelete />} />
                <Route path="/GamingLaptop" element={<GamingLaptop />} />
                <Route path="/Desktop/AllInOne" element={<AllDesktop />} />
                <Route path="/Laptop/AllInOne" element={<LaptopAll />} />
                <Route path="/category/:category" element={<Components2 />} />
                <Route path="/profile" element={<Main_profile />} />
                <Route path="/save/:email" element={<ProfilePage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LoginProvider>
  );
}

const Layout = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {!isLoggedIn && <Navbar />}
      {!isLoggedIn && <Cart_button />}
      {children}
      {!isLoggedIn && <Footer />}
    </>
  );
};

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Component /> : <Navigate to="/Login" />;
};

export default App;
