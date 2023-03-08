import styled from "styled-components"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function SeatsPage({ selectSession, reservados, setNome, setCpf, setReservados, reservarAssentos, nome, cpf }) {

    if (selectSession == null) {
        return (
            <div>Carregando...</div>
        )
    }

    function adicionarReservados(id, isAvailable) {

        let novosReservados = []

        if (!isAvailable) {

            alert("esse assento não está disponivel!!")
            return
        }


        if (reservados.includes(id)) {
            novosReservados = reservados.filter((p) => p !== id)
        } else {
            novosReservados = [...reservados, id,]
        }

        setReservados(novosReservados)
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
                            onClick={() => adicionarReservados(seat.id, seat.isAvailable)}
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
                Nome do Comprador:
                <input data-test="client-name" value={nome} placeholder="Digite seu nome..." onChange={(e) => setNome(e.target.value)} />

                CPF do Comprador:
                <input data-test="client-cpf" value={cpf} placeholder="Digite seu CPF..." onChange={(e) => setCpf(e.target.value)} />

                <Link to={reservados.length == 0 ? "" : "/sucesso"}><button data-test="book-seat-btn" onClick={reservarAssentos}>Reservar Assento(s)</button></Link>
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
    button {
        align-self: center;
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
    border: ${props => props.selecionado ? "1px solid #0E7D71" : props.available ? "1px solid blue" : "1px solid #F7C52B"};         // Essa cor deve mudar
    background-color: ${props => props.selecionado ? "#1AAE9E" : props.available ? "lightblue" : "#FBE192"};    // Essa cor deve mudar
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
    border: ${props => props.selecionado ? "1px solid #0E7D71" : props.available ? "1px solid blue" : "1px solid #F7C52B"};         // Essa cor deve mudar
    background-color: ${props => props.selecionado ? "#1AAE9E" : props.available ? "lightblue" : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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