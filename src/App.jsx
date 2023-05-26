import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import axios from "axios"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'tcLOtEtNTsIr2R4Apzxsn8c5';

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={`/sessoes/:idMovie`} element={<SessionsPage />} />
                <Route path={`/assentos/:idSession`} element={<SeatsPage />} />
                <Route path="/sucesso" element={<SuccessPage />} />
            </Routes>
        </BrowserRouter>
    )
}


