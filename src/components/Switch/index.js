/**
 * Switch Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Switch } from 'element-react'

export default ({ children, title, ...props }) => (
  <Wrapper >
    {Title &&
    <Title>{title}</Title>
  }
    <SwitchContainer {...props} />
  </Wrapper>
)

const Wrapper = styled.div``

const Title = styled.span`
    color:white;
    margin-right: 8px;
    font-size: 12px;
    line-height: 12px;
    font-family: ${({ theme }) => theme.fontFamily};
`

const SwitchContainer = styled(Switch)`


.el-switch__button {

}

.el-switch__core {
 position: unset;
 background: transparent;
 boder-radius: 7px;
 border:none;
/*  width: 28px !important; */


.el-switch__label .el-switch__label--right {
 opacity:0.2;
}
 height: 12px;


.el-switch__label .el-switch__label--right {
 opacity:0.2;
}
}


.el-switch__label .el-switch__label--right {
 opacity:0.2;
}`
