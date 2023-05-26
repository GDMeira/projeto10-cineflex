import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function SeatsPage() {
    const navigate = useNavigate();
    const { idSession } = useParams();
    const [states, setStates] = useState(
        {
            sessionSeats: undefined,
            selectedSeatsId: [],
            buyerName:'',
            buyerCPF: ''
        });

    useEffect(() => updateSeats(), [idSession])

    function updateSeats() {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`);
        
        promise.then(response => {
            if (states.selectedSeatsId.length !== 0) {
                const newSelectedSeatsId = states.selectedSeatsId.filter(seatId => {
                    const newStateOfThisSeat = response.data.seats.find(seat => seat.id === seatId).isAvailable;
                    return newStateOfThisSeat
                })
                setStates({...states, selectedSeatsId: newSelectedSeatsId, sessionSeats: response.data});
            } else {
                setStates({...states, sessionSeats: response.data});
            }
        }).catch(error => {
            alert(`Erro ao acessasr assentos \n ${error.response.data}`);
        });
    }

    function handleClick(selectedSeat) {
        if (selectedSeat.isAvailable) {
            if (states.selectedSeatsId.includes(selectedSeat.id)) {
                const newSelectedSeatsId = states.selectedSeatsId.filter(seatId => seatId !== selectedSeat.id)
                setStates({...states, selectedSeatsId: newSelectedSeatsId});
            } else {
                const newSelectedSeatsId = [...states.selectedSeatsId, selectedSeat.id];
                setStates({...states, selectedSeatsId: newSelectedSeatsId});
            }
        } else {
            alert("Esse assento não está disponível");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const postObject = {
            ids: states.selectedSeatsId,
            name: states.buyerName,
            cpf: states.buyerCPF.split('').filter(char => char !== '.' && char !== '-').join('')
        };
        const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',postObject);
        
        promise.then(() => {
            setStates(
                {
                    sessionSeats: undefined,
                    selectedSeatsId: [],
                    buyerName:'',
                    buyerCPF: 0
                })
            navigate('/sucesso',{ state: states });
        }).catch(error => {
            alert(`Erro ao reservar os assentos. Verifique se ainda estão todos disponíveis \n ${error.reponse.data}`);
            updateSeats();
        });
        
    }

    function adjustCPF(cpf) {
        const cpfNum = cpf.split('').filter(char => char !== '.' && char !== '-');
        let adjustedCPF = '';
        cpfNum.forEach((n,i) => {
            adjustedCPF += n;

            if ((i === 2 && cpfNum.length > 3)|| (i === 5 && cpfNum.length > 6)) {
                adjustedCPF += '.';
            } else if ((i === 8 && cpfNum.length > 9)) {
                adjustedCPF += '-';
            }
        });

        return adjustedCPF
    }

    if (states.sessionSeats === undefined) {
        return <h1>Carregando...</h1>
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {states.sessionSeats.seats.map(seat => <SeatItem
                    key={seat.id}
                    onClick={() => handleClick(seat)}
                    isAvailable={seat.isAvailable}
                    isSelected={states.selectedSeatsId.includes(seat.id)}>
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

            <FormContainer onSubmit={e => handleSubmit(e)}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input placeholder="Digite seu nome..." 
                    id="name" 
                    name="name"
                    required 
                    value={states.buyerName}
                    onChange={e => setStates({...states, buyerName: e.target.value})}
                    data-test="client-name"
                />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input placeholder="Digite seu CPF..."
                    id="cpf" 
                    name="cpf"
                    required 
                    value={adjustCPF(states.buyerCPF)}
                    pattern="^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$"
                    maxLength="14"
                    onChange={e => setStates({...states, buyerCPF: e.target.value})}
                    data-test="client-cpf"
                />

                <button data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={states.sessionSeats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{states.sessionSeats.movie.title}</p>
                    <p>{states.sessionSeats.day.weekday} - {states.sessionSeats.name}</p>
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
const FormContainer = styled.form`
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
            border: 1px solid #0E7D71;      
            background-color: #1AAE9E;
        }
    }

    div:nth-child(2) {
        div {
            border: 1px solid #808F9D;        
            background-color: #C3CFD9;
        }
    }

    div:nth-child(3) {
        div {
            border: 1px solid #F7C52B;        
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
const SeatItem = styled.div.attrs(() => ({'data-test':'seat'}))`
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

    &:hover {
        cursor: ${({isAvailable}) => isAvailable ? 'pointer' : 'not-allowed'};
    }
`
const FooterContainer = styled.div.attrs(() => ({'data-test':'footer'}))`
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