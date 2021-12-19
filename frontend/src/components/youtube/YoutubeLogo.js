import React, {Fragment} from 'react';
import logo from './YouTube_Logo_2017.svg';
import styled from "styled-components";

const Logo = styled.img`
  margin-top: 1em;
`;

function YoutubeLogo() {
    return (
        <Fragment>
            <Logo src={logo} alt=""/>
        </Fragment>
    );
}

export default YoutubeLogo;
