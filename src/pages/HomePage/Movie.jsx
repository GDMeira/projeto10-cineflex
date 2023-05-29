import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Movie({ movie }) {
    return (
        <Link to={`/sessoes/${movie.id}`} key={movie.id}>
            <MovieContainer >
                <img src={movie.posterURL} alt="poster" />
            </MovieContainer>
        </Link>
    )
}

const MovieContainer = styled.div.attrs(({dataTest}) => ({
    'data-test': dataTest || 'movie'
}))`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`