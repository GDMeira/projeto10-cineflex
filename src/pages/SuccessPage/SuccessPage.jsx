import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const states = location.state;
    // {
    //     sessionSeats: {
                        // "id": 1,
                        // "name": "15:00",
                        // "day": {
                        // 		"id": 24062021,
                        //   "weekday": "Quinta-feira",
                        //   "date": "24/06/2021",
                        // 	},
                        // "movie": {
                        //     "id": 1,
                        //     "title": "2067",
                        //     "posterURL": "https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
                        //     "overview": "A lowly utility worker is called to the future by a mysterious radio signal, he must leave his dying wife to embark on a journey that will force him to face his deepest fears in an attempt to change the fabric of reality and save humankind from its greatest environmental crisis yet.",
                        //     "releaseDate": "2020-10-01T00:00:00.000Z",
                        // },
    //     selectedSeatsId: [],
    //     buyerName:'',
    //     buyerCPF: 0
    // }


    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer dataTest="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{states.sessionSeats.movie.title}</p>
                <p>{states.sessionSeats.day.date} - {states.sessionSeats.name}</p>
            </TextContainer>

            <TextContainer dataTest="seats-info">
                <strong><p>Ingressos</p></strong>
                {states.selectedSeatsId.map(seatId => {
                    const seat = states.sessionSeats.seats.find(seat => seat.id === seatId);
                    const number = Number(seat.name) < 9 ? 0 + seat.name : seat.name;
                    return <p key={seat.id}>Assento {number}</p>
                })}
            </TextContainer>

            <TextContainer dataTest="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {states.buyerName}</p>
                <p>CPF: {states.buyerCPF}</p>
            </TextContainer>

            <button 
                onClick={() => navigate('/')}
                data-test="go-home-btn"
            >
                Voltar para Home
            </button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div.attrs(({dataTest}) => ({'data-test': dataTest}))`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`