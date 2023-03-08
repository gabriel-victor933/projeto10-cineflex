import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const urlMovies = "https://mock-api.driven.com.br/api/v8/cineflex/movies";

export default function App() {

    const [movies, setMovies] = useState([])
    const [selectMovie, setSelectMovie] = useState(null)
    const [selectSession, setSelectSession] = useState(null)

    const [reservados, setReservados] = useState([])
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [loading, setLoading] = useState(true)


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
        setReservados([])
    }



    useEffect(() => {
        getMovies()
    }, [])


    function reservarAssentos() {

        const reserva = { ids: reservados, name: nome, cpf: cpf }

        const promisse = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", reserva)

        promisse.then((dados) => {
            console.log(dados)
            setLoading(false)
        })

        promisse.catch((erro) => {
            console.log(erro)
        })

    }

    return (
        <>

            {/* 
             */}

            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path={"/"} element={<HomePage movies={movies} selecionarFilme={selecionarFilme} />} />
                    <Route path={"/sessoes/:id"} element={<SessionsPage selectMovie={selectMovie} selecionarSecao={selecionarSecao} />} />
                    <Route path={"/assentos/:id"} element={<SeatsPage selectSession={selectSession} reservados={reservados} setNome={setNome} setCpf={setCpf} setReservados={setReservados} reservarAssentos={reservarAssentos} />} />
                    <Route path={"/sucesso"} element={<SuccessPage loading={loading} reservados={reservados} nome={nome} cpf={cpf} selectSession={selectSession} />} />
                </Routes>
            </BrowserRouter>
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
