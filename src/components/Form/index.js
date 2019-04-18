/**
 * Form Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gptriarca@ubiwhere.com>
 */

import styled from 'styled-components'
import { Form as form } from 'element-react'


const Item = form.Item

const Form = styled(form)`
.el-form-item__label {
  color: ${({theme}) => theme.secondaryColor };
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
}
`
Form.Item = Item

export default Form
