import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const urlMovies = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

export default function App() {

    const [movies, setMovies] = useState([])
    const [selectMovie, setSelectMovie] = useState({ id: null })
    const [selectSession, setSelectSession] = useState({ id: null })

    async function getMovies() {

        try {
            const response = await axios.get(urlMovies)

            setMovies(response.data)

        } catch (erro) {
            console.log(erro)
        }

    }

    async function getMovie(id) {

        try {
            const response = await axios.get(`${urlMovies}/${id}/showtimes`)

            setSelectMovie(response.data)

        } catch (erro) {
            console.log(erro)
        }

    }

    async function getSession(id) {

        try {
            const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`)

            setSelectSession(response.data)

        } catch (erro) {
            console.log(erro)
        }

    }

    function selecionarFilme(id) {
        getMovie(id)
    }

    function selecionarSecao(id) {
        getSession(id)
    }

    console.log(selectSession)


    useEffect(() => {
        getMovies()
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage movies={movies} selecionarFilme={selecionarFilme} />,
        },
        {
            path: "/sessoes/:id",
            element: <SessionsPage selectMovie={selectMovie} selecionarSecao={selecionarSecao} />,
        },
        {
            path: "/assentos/:id",
            element: <SeatsPage selectSession={selectSession} />
        }
    ]);


    return (
        <>
            <NavContainer>CINEFLEX</NavContainer>
            <RouterProvider router={router} />
            {/* 
            
            <SuccessPage /> */}
        </>
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
