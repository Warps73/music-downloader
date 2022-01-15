import React, {useState} from "react";
import './App.css';
import Spotify from "./components/spotify/Spotify";
import Youtube from "./components/youtube/Youtube";
import styled from "styled-components";


const Button = styled.button`
    border: none;
    height: 40px;
    font-weight: 700;
    font-size: 1em;
    background-image: ${props => props.gradient};
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`

const Components = {
    spotify: Spotify,
    youtube: Youtube
};

function App() {

    const youtube = 'youtube';
    const spotify = 'spotify';
    const [selectedProvider, setSelectedProvider] = useState(spotify)
    const handleClick = function (v) {
        setSelectedProvider(v)
    }
    const renderComponent = function (key) {
        if (typeof Components[selectedProvider] !== "undefined") {
            return React.createElement(Components[selectedProvider])
        }
        return Spotify
    }
    return (
        <>
            <ButtonContainer>
                <Button
                    gradient={selectedProvider === spotify ? 'linear-gradient(to right, #1DB954 0%, #ff0000  51%, #ff0000  100%)' : 'linear-gradient(to right, #ff0000 0%, #1DB954  51%, #1DB954  100%)'}
                    onClick={() => handleClick(selectedProvider === spotify ? youtube : spotify)}>{selectedProvider === spotify ? youtube : spotify}
                </Button>
            </ButtonContainer>
            {renderComponent(selectedProvider)}
        </>
    );
}

export default App;
