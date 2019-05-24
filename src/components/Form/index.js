/**
 * Form Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gptriarca@ubiwhere.com>
 */

import styled from 'styled-components'
import { Form as form } from 'element-react'



const Form = styled(form)`
.el-form-item {
  margin-bottom: 30px;
}
.el-form-item.is-required .el-form-item__label:after {
  content: '*';
  margin-left: 5px;
}
.el-form-item.is-required .el-form-item__label:before {
  content: '';
}
.el-input-group__append, .el-input-group__prepend {
  background: transparent;
  color: ${({theme}) => theme.secondaryColor };
}
.el-input-group__append, .el-input-group__prepend {
  border: none;
}
`
const Item = styled(form.Item)`
.el-form-item__label {
  color: ${({theme}) => theme.secondaryColor };
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
}
${({status}) => status && `
  input {
    border: 1px solid rgba(221,108,108,0.4);
  }
  .el-form-item__label {
    color: #DD6C6C;
  }
  .el-form-item.is-required .el-form-item__label:after {
    color: #DD6C6C;
  }
`}
/* ${({status}) => status === 'warning' && `
  input {
    border: 1px solid rgba(221,209,108,0.4);
  }
`}
${({status}) => status === 'success' && `
  input {
    border: 1px solid rgba(140,193,78,0.4);
  }
`} */
${({status}) => !status && `
.el-form-item__label {
  color: ${({theme}) => theme.secondaryColor };
}
`}
`
const Error = styled.div`
  color: ${({theme}) => theme.dangerColor };
  font-size: 12px;
  line-height: 1;
  padding-top: 8px;
  position: absolute;
  top: 100%;
  left: 5px;
`


Form.Item = Item
Form.Error = Error

export default Form
