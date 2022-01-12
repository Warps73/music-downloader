import React, {Fragment} from 'react';
import styled from 'styled-components';

const Button = styled.button`
    border: none;
    background-image: linear-gradient(to right, #1DB954 0%, rgb(255 130 53) 51%, #1DB954 100%);
    padding: 0.25em 1em;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px #eee;
    display: block;
    :hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
           
`;

function SpotifyButton(props) {


    return (
        <Fragment>
            <Button onClick={props.onClick}>Download</Button>
        </Fragment>
    );
}

export default SpotifyButton;
