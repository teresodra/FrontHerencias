import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HeritancePage from "./pages/HeritancePage";
import NewHeritancePage from "./pages/NewHeritancePage";
import Header from "./Components/Header";
import ValorationPage from "./pages/ValorationPage";

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

                        <Route exact path="/heritance/:heritanceId" element={<HeritancePage/>} />
                        <Route exact path="/new-heritance" element={<NewHeritancePage/>} />
                        <Route exact path="/valoration" element={<ValorationPage/>} />
                        
                    </Route>
                </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
};
export default Router;