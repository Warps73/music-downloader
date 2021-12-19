import './App.css';
import Spotify from "./components/spotify/Spotify";
import {useState} from "react";
import Youtube from "./components/youtube/Youtube";
import styled from "styled-components";


const Button = styled.button`
  text-transform: capitalize;
  border: none;
  background: black;
  color: white;
  font-weight: 700;
  font-size: 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  height: 40px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`

function App() {

    const youtube = 'youtube';
    const spotify = 'spotify';
    const [selectedProvider, setSelectedProvider] = useState(spotify)
    const handleClick = function (v) {
        setSelectedProvider(v)
    }
    return (
        <>
            <ButtonContainer>
                    <Button
                        onClick={() => handleClick(selectedProvider === spotify ? youtube : spotify)}>{selectedProvider === spotify ? youtube : spotify}
                    </Button>
            </ButtonContainer>
            {selectedProvider === 'spotify' ?
                <Spotify/> : <Youtube/>
            }
        </>
    );
}

export default App;
