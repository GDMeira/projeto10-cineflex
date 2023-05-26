import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
    <NavContainer>
        {(location.pathname !== '/' && location.pathname !== '/sucesso') && (
            <button 
                onClick={() => navigate(-1)}
                data-test="go-home-header-btn"
            >Voltar</button>
        )}
        CINEFLEX
    </NavContainer>)
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    position: relative;
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

    button {
        position: absolute;
        left: 0;
    }
`