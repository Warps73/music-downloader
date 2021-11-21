import React, {Fragment} from 'react';
import styled from "styled-components";

const Input = styled.input`
    height: 34px;
    flex:1;
`;

function SearchInput(props) {
    return (
        <Fragment>
            <Input value={props.value} placeholder={props.placeholder} onChange={props.onChange} type="text"/>
        </Fragment>
    );
}

export default SearchInput;
