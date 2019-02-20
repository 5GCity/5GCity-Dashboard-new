/**
 * DatePicker Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import styled from 'styled-components'
import { DatePicker } from 'element-react'


export default styled(DatePicker)`

.el-date-editor.el-input {
  width: 100%;
}

.el-input__inner {
  border: 1px solid white;
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
`
