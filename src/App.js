import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar"


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
        setNome("")
        setCpf("")
    }



    useEffect(() => {
        getMovies()
    }, [])

    function reservarAssentos() {

        if (reservados.length == 0) return

        const reserva = { ids: reservados, name: nome, cpf: cpf }

        const promisse = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", reserva)

        promisse.then((dados) => {
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
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<HomePage movies={movies} selecionarFilme={selecionarFilme} />} />
                    <Route path={"/sessoes/:id"} element={<SessionsPage selectMovie={selectMovie} selecionarSecao={selecionarSecao} />} />
                    <Route
                        path={"/assentos/:id"}
                        element={<SeatsPage selectSession={selectSession} reservados={reservados} setNome={setNome} setCpf={setCpf} setReservados={setReservados} reservarAssentos={reservarAssentos} nome={nome} cpf={cpf} />} />
                    <Route path={"/sucesso"} element={<SuccessPage loading={loading} reservados={reservados} nome={nome} cpf={cpf} selectSession={selectSession} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}


