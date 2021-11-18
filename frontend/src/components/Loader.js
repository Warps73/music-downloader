import React from 'react';
import loader from './bars.svg';
import styled from "styled-components";

const Spinner = styled.img`
    width : 50px;
    height: auto;
`
const Container = styled.div`
    margin-top: 2.5em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

function Loader() {
    return (
        <Container>
            <div>Téléchagement en cours...</div>
            <Spinner src={loader} alt=""/>
        </Container>
    );
}

export default Loader;
