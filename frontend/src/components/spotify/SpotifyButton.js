import React, {Fragment} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #1DB954;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #1DB954;
  cursor: pointer;
  height: 40px;
`;

function SpotifyButton(props) {


    return (
        <Fragment>
            <Button onClick={props.onClick}>Download</Button>
        </Fragment>
    );
}

export default SpotifyButton;
