import React, {Fragment} from 'react';
import logo from './Spotify_logo_with_text.svg';
import styled from "styled-components";

const Logo = styled.img`
  margin-top: 1em;
`;

function SpotifyLogo() {
    return (
        <Fragment>
            <Logo src={logo} alt=""/>
        </Fragment>
    );
}

export default SpotifyLogo;
