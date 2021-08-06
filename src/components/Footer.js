import { Link } from "react-router-dom";

import styled from "styled-components";

export default function Footer({ currentPage }) {
    return (
        <Container>
            <Link to="/" className={currentPage === 'list' ? 'active' : ''}>Pokédex</Link>
            <Link to="/my-pokemons" className={currentPage === 'my-pokemons' ? 'active' : ''}>My Pokémons</Link>
            <Link to="/chat" className={currentPage === 'chat' ? 'active' : ''}>Chat</Link>
        </Container>
    );
}

const Container = styled.div`
    background: #E44141;
    padding: 10px 0;
    box-shadow: 0 -4px 10px 5px rgba(0,0,0,0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    height: 65px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    color: white;
    font-size: 18px;

    & .active {
        font-weight: bold;
    }
`;
