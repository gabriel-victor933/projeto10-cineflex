import styled from "styled-components"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Comprador from "./Comprador"
import axios from "axios"

export default function SeatsPage({ compradores, setCompradores, assentos, setAssentos, setInfoMovie, reservados, setReservados, reservarAssentos }) {

    const [selectSession, setSelectSession] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    async function getSession(id) {

        try {
            const { data } = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`)

            setSelectSession(data)
            setInfoMovie({ title: data.movie.title, data: data.day.date, hora: data.name })

        } catch (erro) {
            console.log(erro)
        }

    }

    useEffect(() => {

        getSession(id)
        setReservados([])
        setAssentos([])
        setCompradores([])

    }, [])

    if (selectSession == null) {
        return (
            <div>Carregando...</div>
        )
    }

    function adicionarReservados(id, isAvailable, name) {
        let novosReservados = []
        let novosAssentos = []



        if (!isAvailable) {
            alert("esse assento não está disponivel!!")
            return
        }


        if (reservados.includes(id)) {

            if (!window.confirm(`Apagar assento?`)) return 0

            novosReservados = reservados.filter((p) => p !== id)
            novosAssentos = assentos.filter((p) => p !== name)




        } else {

            novosReservados = [...reservados, id]
            novosAssentos = [...assentos, name]
        }

        setReservados(novosReservados)
        setAssentos(novosAssentos)
    }



    function reservarAssentos(e) {

        e.preventDefault()

        if (reservados.length == 0) return

        const reserva = { ids: reservados, compradores: compradores }
        console.log(reserva)


        const promisse = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", reserva)

        promisse.then((dados) => {
            console.log(dados)
            navigate("/sucesso")
        })

        promisse.catch((erro) => {
            console.log(erro)
        })

    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {selectSession.seats.map((seat) => {
                    return (
                        <SeatItem
                            data-test="seat"
                            selecionado={reservados.includes(seat.id)}
                            key={seat.id}
                            available={seat.isAvailable}
                            onClick={() => adicionarReservados(seat.id, seat.isAvailable, seat.name)}
                        >
                            {seat.name}
                        </SeatItem>
                    )
                })}

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle selecionado={true} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle available={true} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle available={false} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={reservarAssentos}>

                    {reservados.map((r, i) => <Comprador key={r} r={r} i={i} compradores={compradores} setCompradores={setCompradores} assentos={assentos} />)}
                    <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={selectSession.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{selectSession.movie.title}</p>
                    <p>{selectSession.day.weekday} - {selectSession.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;

    div,form {
        text-align: left;
    }

    a, button {
        align-self: center;
        text-decoration: none;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: ${props => props.selecionado ? "1px solid #0E7D71" : props.available ? "1px solid #7B8B99" : "1px solid #F7C52B"};         // Essa cor deve mudar
    background-color: ${props => props.selecionado ? "#1AAE9E" : props.available ? "#C3CFD9" : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: ${props => props.selecionado ? "1px solid #0E7D71" : props.available ? "1px solid #7B8B99" : "1px solid #F7C52B"};         // Essa cor deve mudar
    background-color: ${props => props.selecionado ? "#1AAE9E" : props.available ? "#C3CFD9" : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    color: #000000;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`