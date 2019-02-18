/**
 * InputMask Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import MaskedInput from 'react-text-mask'

export default ({ children, ...props }) => (
  <MaskedInput {...props}
  id="my-input-id"
  render={(ref, props) => (
    <MyStyledInput innerRef={ref} {...props} />
  )}
/>
)

const MyStyledInput = styled.input`
  font-size:14px;
  font-weight: 600;
  background-color:transparent;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.2);
  padding:15px 16px;
  color:#EFF2F7;
`;
