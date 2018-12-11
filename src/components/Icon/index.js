/**
 * Icon Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

export default ({ children, icon, ...props }) => (
  <Wrapper {...props}>{icon}</Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #89979F;

${({small})=> small ? `
  height: 32px;
  width: 32px;`
  :`
  height: 44px;
  width: 44px;`
}
`

