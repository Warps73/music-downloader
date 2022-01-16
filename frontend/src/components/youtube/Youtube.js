import {useState} from "react";
import axios from "axios";
import fileDownload from 'js-file-download'
import YoutubeButton from "./YoutubeButton";
import styled from "styled-components";
import YoutubeLogo from "./YoutubeLogo";
import SearchInput from "../SearchInput";
import Loader from "../Loader";

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

function Youtube() {
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

        axios.post('http://localhost:5000/api/download-youtube/', {
            url: url,
            withCredentials: true
        }, {
            responseType: 'blob',
        }).then( async function (response) {
            const filename = response.headers['content-disposition'].split('=')[1]
            fileDownload(response.data, filename)
            setIsLoading(false);
            setUrl('');

        })
            .catch(function (error) {
                setIsLoading(false);
                console.log(error);
            });
    };


    return (
        <Container>
            <YoutubeLogo/>
            <SearchContainer>
                <InputContainer>
                    <SearchInput placeholder="Youtube url" value={url} onChange={handleChange}/>
                    <YoutubeButton onClick={handleClick}>Download</YoutubeButton>
                </InputContainer>
                {isLoading ? <Loader/> : <></>}
            </SearchContainer>
        </Container>
    );
}

export default Youtube;
