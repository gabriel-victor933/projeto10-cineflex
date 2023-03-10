import styled from "styled-components"
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"

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


    button {
        background-color: #C3CFD9; 
        text-decoration: none;
        color: black;
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%)
    }
`

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <NavContainer>
            {window.location.pathname !== "/" && <button data-test="go-home-header-btn" onClick={() => navigate(-1)}><BsArrowLeft /></button>}
            CINEFLEX
        </NavContainer>
    )

}

export default Navbar
