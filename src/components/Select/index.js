/**
 * Select Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Select } from 'element-react'
import { darken, lighten } from 'polished'




export default ({ children, options, ...props }) => (
  <Wrapper {...props}>
  <NameInput uppercase={props.uppercase}>{props.title}</NameInput>
  <StyledSelect {...props} headerNav={props.headerNav}>
    {options && options.map((el) =>
      <Select.Option value={el.value} key={el.value} label={el.name} disabled={el.disabled}></Select.Option>    
    )}
  </StyledSelect>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  margin: 0 32px;
    :last-child{
      margin-right: 0;
    }
${({ headerNav }) => headerNav && `
  margin: 0;
`}
`
const NameInput = styled.p`
  align-self: center;
  color: #89979F;
  margin: 0;
  font-size: 12px;
  padding-right: 8px;
  ${({ uppercase }) => uppercase && `text-transform: uppercase;`}
  font-family: ${({ theme }) => theme.secondaryFont };
`

const StyledSelect = styled(Select)`

input {
  background-color:transparent;
  color: white;
  border-radius: 6px;
  border: 1px solid rgba(239,242,247,0.2);
  padding: 10px 12px;
}

.el-input {
  font-size: 14px;
  ${({ headerNav }) => headerNav &&`
    font-size: 12px;
    width: 110px;
  `}
}

${({type})=> type === 'default' &&`
input {
  border: none;
}
`
}

.el-select-dropdown {
  position: absolute !important;
  background: ${({ theme }) => theme.bodyBackground};
  border-color: ${({ theme }) => theme.bodyBackground};
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  left: 0!important;
  border-top: 0;
  margin: 0;
  border-radius: 6px;
  overflow: hidden;
}

.el-select-dropdown__item {
  color: #fff;
}

.el-select-dropdown__item.selected {
  background-color:${({ theme }) => lighten(0.1,theme.bodyBackground)};
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background: ${({ theme }) => darken(0.1,theme.bodyBackground)};
}

.el-select-dropdown__list {
  padding: 0
}

.el-input .el-input__icon {
  color: red;
  font-size: 8px;
}

.el-input .el-input__icon {
  color: white;
  font-size: 14px;
}
`

StyledSelect.Option = Select.Option
StyledSelect.OptionGroup = Select.OptionGroup
