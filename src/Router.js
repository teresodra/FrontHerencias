import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './services/AuthContext'; // Import the AuthProvider
import HomePage from "./pages/HomePage";
import NewHeritancePage from "./pages/NewHeritancePage";
import Header from "./Components/Header";
import ValorationPage from "./pages/ValorationPage";
import Footer from "./Components/Footer";
import InheritancesListPage from "./pages/InheritancesListPage";
import InheritancePage from "./pages/InheritancePage";
import HeirsListPage from "./pages/HeirsListPage";
import SolutionPage from "./pages/SolutionPage";
import LoginPage from "./pages/authentication/LoginPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import ChangePasswordPage from "./pages/authentication/ConfirmPasswordPage";

const Router = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="page-container">
                    <Header/>
                    <div className='body-content'>
                    <Routes>
                        <Route>
                            <Route exact path="/login" element={<LoginPage/>} />
                            <Route exact path="/sign-up" element={<SignUpPage/>} />
                            <Route exact path="/change-password" element={<ChangePasswordPage/>} />

                            <Route exact path="/" element={<HomePage/>} />
                            <Route exact path="/home" element={<HomePage/>} />

                            {/* <Route exact path="/heritance/:heritanceId" element={<HeritancePage/>} /> */}
                            
                            <Route exact path="/new-heritance" element={<NewHeritancePage/>} />
                            <Route exact path="/inheritances-list" element={<InheritancesListPage/>} />
                            <Route exact path="/inheritance/:inheritanceId" element={<InheritancePage/>} />
                            <Route exact path="/inheritance/:inheritanceId/heir" element={<HeirsListPage/>} />
                            <Route exact path="/inheritance/:inheritanceId/solution" element={<SolutionPage/>} />
                            <Route exact path="/inheritance/:inheritanceId/heir/:heirId/valoration" element={<ValorationPage/>} />
                            
                        </Route>
                    </Routes>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
};
export default Router;