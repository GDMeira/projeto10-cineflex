import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'tcLOtEtNTsIr2R4Apzxsn8c5';

    //n sei se vou usar, acho q terei q contruir todas as pgs com todas as rotas possiveis usando map
    const [states, setStates] = useState({
        idFilme: -1,
        idSessao: -1,
        idAssentos: []
    });

    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={`/sessoes/:idMovie`} element={<SessionsPage />} />
                <Route path={`/assentos/:idSession`} element={<SeatsPage />} />
                <Route path="/sucesso" element={<SuccessPage />} />
            </Routes>
            
            {/* <SeatsPage /> */}
            {/* <SessionsPage /> */}
            {/* <SuccessPage /> */}
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
