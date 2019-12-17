/**
 * DatePicker Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { DateRangePicker } from 'element-react'


export default ({ children, ...props }) => (
  <Wrapper>
    {props.label &&
    <Label>{props.label}</Label>
    }
    <StyledDate {...props} />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.p`
  color: ${({theme}) => theme.secondaryColor};
  font-family: ${({theme}) => theme.fontDinExp};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 12px;
  margin-right: 8px;
`

const StyledDate = styled(DateRangePicker)`
.el-date-editor.el-input {
  width: auto;
}

.el-input el-input--small el-date-range-picker__editor {
  background-color: transparent;
  color: white;
}

.el-input__inner {
  border: 1px solid rgba(255,255,255,0.2);
  background-color: transparent;
  color: white;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
}

.el-input__icon {
  color:white;
}

.el-date-table td.end-date, .el-date-table td.start-date {
  background-color: rgb(140, 193, 78);
}

.el-date-table td.in-range {
  background-color: rgba(140, 193, 78, 0.3);
}
`
