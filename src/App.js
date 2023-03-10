import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"


export default function App() {

    const [infoMovie, setInfoMovie] = useState(null)
    const [reservados, setReservados] = useState([])
    const [assentos, setAssentos] = useState([])
    const [compradores, setCompradores] = useState([])

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
                        element={<SeatsPage compradores={compradores} setCompradores={setCompradores} assentos={assentos} setAssentos={setAssentos} setInfoMovie={setInfoMovie} reservados={reservados} setReservados={setReservados} />} />
                    <Route
                        path={"/sucesso"}
                        element={<SuccessPage compradores={compradores} reservados={reservados} infoMovie={infoMovie} assentos={assentos} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}


