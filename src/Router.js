import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewHeritancePage from "./pages/NewHeritancePage";
import Header from "./Components/Header";
import ValorationPage from "./pages/ValorationPage";
import Footer from "./Components/Footer";
import InheritancesListPage from "./pages/InheritancesListPage";
import InheritancePage from "./pages/InheritancePage";
import HeirsListPage from "./pages/HeirsListPage";

const Router = () => {

    return (
        <BrowserRouter>
            <div className="page-container">
                <Header/>
                <div className='body-content'>
                <Routes>
                    <Route>
                        <Route exact path="/" element={<HomePage/>} />
                        <Route exact path="/home" element={<HomePage/>} />

                        {/* <Route exact path="/heritance/:heritanceId" element={<HeritancePage/>} /> */}
                        <Route exact path="/new-heritance" element={<NewHeritancePage/>} />
                        <Route exact path="/inheritances-list" element={<InheritancesListPage/>} />
                        <Route exact path="/inheritance/:inheritanceId" element={<InheritancePage/>} />
                        <Route exact path="/inheritance/:inheritanceId/heir" element={<HeirsListPage/>} />
                        <Route exact path="/inheritance/:inheritanceId/heir/:heirId/valoration" element={<ValorationPage/>} />
                        
                    </Route>
                </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    )
};
export default Router;