import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function SeatsPage() {

    const { idSession } = useParams();
    const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`);
    const [sessionSeats, setSessionseats] = useState(undefined);
    const [selectedSeatsId, setSelectedSeatsId] = useState([]);

    useEffect(() => {
        promise.then(response => {
            setSessionseats(response.data)
        }).catch(error => {
            alert(`Erro ao acessasr assentos \n ${error.response.data}`)
        });
    }, [idSession])

    if (sessionSeats === undefined) {
        return <h1>Carregando...</h1>
    }
    /* 
    "seats": [
				{
            "id": 10001,
            "name": "1",
            "isAvailable": false,
        },
    */

    function handleClick(selectedSeat) {
        if (selectedSeat.isAvailable) {
            if (selectedSeatsId.includes(selectedSeat.id)) {
                setSelectedSeatsId(selectedSeatsId.filter(seatId => seatId !== selectedSeat.id));
            } else {
                setSelectedSeatsId([...selectedSeatsId, selectedSeat.id])
            }
        } else {
            alert("Esse assento não está disponível");
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {sessionSeats.seats.map(seat => <SeatItem
                    key={seat.id}
                    onClick={() => handleClick(seat)}
                    isAvailable={seat.isAvailable}
                    isSelected={selectedSeatsId.includes(seat.id)}>
                    {seat.name}
                </SeatItem>)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>

                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>

                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={sessionSeats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessionSeats.movie.title}</p>
                    <p>{sessionSeats.day.weekday} - {sessionSeats.name}</p>
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

    div:nth-child(1) {
        div {
            border: 1px solid #0E7D71;         // Essa cor deve mudar
            background-color: #1AAE9E;
        }
    }

    div:nth-child(2) {
        div {
            border: 1px solid #808F9D;         // Essa cor deve mudar
            background-color: #C3CFD9;
        }
    }

    div:nth-child(3) {
        div {
            border: 1px solid #F7C52B;         // Essa cor deve mudar
            background-color: #FBE192;
        }
    }
`
const CaptionCircle = styled.div`
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
    border: 1px solid ${({ isAvailable, isSelected }) => {
        if (!isAvailable) {
            return '#F7C52B'
        } else if (!isSelected) {
            return '#808F9D'
        } else {
            return '#0E7D71'
        }
    }};
    background-color: ${({ isAvailable, isSelected }) => {
        if (!isAvailable) {
            return '#FBE192'
        } else if (!isSelected) {
            return '#C3CFD9'
        } else {
            return '#1AAE9E'
        }
    }};
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