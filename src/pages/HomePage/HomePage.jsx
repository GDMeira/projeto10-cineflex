import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Movie from "./Movie";

export default function HomePage() {

    const [moviesList, setMoviesList] = useState(undefined);
    const promise = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');

    useEffect(() => {
        promise.then(response => {
            const newMoviesList = response.data;
            setMoviesList(newMoviesList);
        }).catch(error => {
            alert(`Falha ao se conectar com o servidor de filmes. \n
            ${error.response.data}`);
        });
    }, []);

    if (moviesList === undefined) {
        return <h1>Carregando</h1>
    }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {moviesList.map(movie => <Movie movie={movie}/>)}

            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`