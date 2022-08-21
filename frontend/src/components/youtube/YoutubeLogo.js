import React, {Fragment} from 'react';
import logo from './YouTube_Logo_2017.svg';
import styled from "styled-components";

const Logo = styled.img`
  margin-top: 1em;
  max-width: 300px;
`;
const LogoContainer = styled.div`
  text-align: center;
  width: 100%;
`;

function YoutubeLogo() {
    return (
        <LogoContainer>
            <Logo src={logo} alt=""/>
        </LogoContainer>
    );
}

export default YoutubeLogo;
