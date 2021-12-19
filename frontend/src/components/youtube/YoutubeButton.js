import React, {Fragment} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #ff0000;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ff0000;
  cursor: pointer;
  height: 40px;
`;

function YoutubeButton(props) {


    return (
        <Fragment>
            <Button onClick={props.onClick}>Download</Button>
        </Fragment>
    );
}

export default YoutubeButton;
