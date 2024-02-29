import * as React from 'react';
import styled from 'styled-components';

export const View = styled.div`
`;

export const ScrollView = styled.div`
overflow: auto;
`;

export const Image = styled.img`
`;

export const TextInput = styled.input`
`;

export const TextArea = styled.textarea`
`;

export const Picker = styled.select`
`;

export const Text = styled.label`
`;

export const TouchableHighlight = styled.span`
`;

// export const Button = styled.button`
//   cursor: pointer;
//   background: transparent;
//   font-size: 16px;
//   border-radius: 3px;
//   color: ${props => (props.primary ? 'violet' : 'palevioletred')};
//   border: ${props =>
//     props.primary ? '2px solid violet' : '2px solid palevioletred'};
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   transition: 0.5s all ease-out;

//   &:hover {
//     color: white;
//     background-color: ${props =>
//       props.primary ? 'violet' : 'palevioletred'};
//   }
// `;