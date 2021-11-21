import './App.css';
import {useState} from "react";
import axios from "axios";
import fileDownload from 'js-file-download'
import SpotifyButton from "./components/spotify/SpotifyButton";
import styled from "styled-components";
import SpotifyLogo from "./components/spotify/SpotifyLogo";
import SearchInput from "./components/SearchInput";
import Loader from "./components/Loader";

const Container = styled.div`
    margin-right: 15%;
    margin-left: 15%;
    display : flex;
    height: 100vh;
    flex-direction: column;
`;
const SearchContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InputContainer = styled.div`
    display: flex;

`

function App() {
    const [url, setUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = function (e) {
        setUrl(e.target.value)
    }

    const handleClick = function () {
        if (url) {
            download()
        } else {
            console.error('url not found')
        }
    }

    const download = function () {

        setIsLoading(true);

        axios.post('http://localhost:5000/spotifyAPI', {
            url: url,
        }, {
            responseType: 'blob',
        }).then( async function (response) {
            const filename = response.headers['content-disposition'].split('=')[1]
            fileDownload(response.data, filename)
            setIsLoading(false);

        })
            .catch(function (error) {
                setIsLoading(false);
                console.log(error); // todo manage error
            });
    };


    return (
        <Container>
            <SpotifyLogo/>
            <SearchContainer>
                <InputContainer>
                    <SearchInput placeholder="Spotify Url" onChange={handleChange}/>
                    <SpotifyButton onClick={handleClick}>Download</SpotifyButton>
                </InputContainer>
                {isLoading ? <Loader/> : <></>}

            </SearchContainer>
        </Container>
    );
}

export default App;
