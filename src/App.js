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

    const [infoMovie, setInfoMovie] = useState(null)
    const [reservados, setReservados] = useState([])
    const [assentos, setAssentos] = useState([])
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [loading, setLoading] = useState(true)

    function reservarAssentos() {

        if (reservados.length == 0) return

        const reserva = { ids: reservados, name: nome, cpf: cpf }

        const promisse = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", reserva)

        promisse.then((dados) => {
            setLoading(false)
            console.log(dados)
        })

        promisse.catch((erro) => {
            console.log(erro)
        })

    }

    console.log(assentos, reservados)

    return (
        <>

            {/* 
             */}

            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/sessoes/:id"} element={<SessionsPage />} />
                    <Route
                        path={"/assentos/:id"}
                        element={<SeatsPage assentos={assentos} setAssentos={setAssentos} setInfoMovie={setInfoMovie} reservados={reservados} setNome={setNome} setCpf={setCpf} setReservados={setReservados} reservarAssentos={reservarAssentos} nome={nome} cpf={cpf} />} />
                    <Route
                        path={"/sucesso"}
                        element={<SuccessPage loading={loading} reservados={reservados} nome={nome} cpf={cpf} infoMovie={infoMovie} assentos={assentos} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}


