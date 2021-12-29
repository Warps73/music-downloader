import React, {Fragment} from 'react';
import styled from 'styled-components';



const Button = styled.button`
    border: none;
    background-image: linear-gradient(to right, #ee0979 0%, #ff6a00 51%, #ee0979 100%);
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
//  .btn-grad:hover {
//             background-position: right center; /* change the direction of the change here */
//             color: #fff;
//             text-decoration: none;
//           }

function YoutubeButton(props) {


    return (
        <Fragment>
            <Button onClick={props.onClick}>Download</Button>
        </Fragment>
    );
}

export default YoutubeButton;
