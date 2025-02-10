import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './services/AuthContext'; // Import the AuthProvider
import HomePage from "./pages/HomePage";
import NewHeritancePage from "./pages/NewHeritancePage";
import Header from "./Components/utils/Header";
import ValorationPage from "./pages/ValorationPage";
import Footer from "./Components/utils/Footer";
import InheritancePage from "./pages/InheritancePage";
import HeirsListPage from "./pages/HeirsListPage";
import SolutionPage from "./pages/SolutionPage";
import LoginPage from "./pages/authentication/LoginPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import ChangePasswordPage from "./pages/authentication/ConfirmPasswordPage";
import PrivateRoute from "./Components/auth/PrivateRoute";
import ConfirmEmailPage from "./pages/authentication/ConfirmEmailPage";
import RecoverPasswordPage from "./pages/authentication/RecoverPassword";
import SolutionUnvaluedPage from "./pages/SolutionUnvaluedPage";

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
                            <Route path="/confirm-email" element={<ConfirmEmailPage/>}/>
                            <Route path="/recover-password" element={<RecoverPasswordPage/>}/>

                            <Route exact path="/" element={<PrivateRoute element={HomePage} />} />
                            <Route exact path="/home" element={<PrivateRoute element={HomePage} />} />

                            {/* <Route exact path="/heritance/:heritanceId" element={<HeritancePage/>} /> */}
                            
                            <Route exact path="/inheritance/new" element={<PrivateRoute element={NewHeritancePage} />}/>
                            <Route exact path="/inheritance/:inheritanceId" element={<PrivateRoute element={InheritancePage} />} />
                            <Route exact path="/inheritance/:inheritanceId/heir" element={<PrivateRoute element={HeirsListPage} />} />
                            <Route exact path="/inheritance/:inheritanceId/solution" element={<PrivateRoute element={SolutionPage} />} />
                            <Route exact path="/inheritance/:inheritanceId/solution-unvalued" element={<PrivateRoute element={SolutionUnvaluedPage} />} />
                            <Route exact path="/inheritance/:inheritanceId/heir/:heirId/valoration" element={<PrivateRoute element={ValorationPage} />} />
                            
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