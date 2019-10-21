/**
 * Input Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import styled from 'styled-components'
import { Input } from 'element-react'
import { lighten } from 'polished'

export default styled(Input)`
  witdh:100%;

  input {
      font-size:14px;
      font-weight: 600;
      background-color:transparent;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.2);
      padding:15px 16px;
      color:#EFF2F7;
      font-family: "Open Sans";
    }
    .el-input__icon {
      color:#5A666D;
    }

  .el-input__inner:focus {
    outline: 0;
    border-color: #5A666D;
  }

  ${({icon}) => icon === 'search' && `
  .el-input__icon {
    left:0;
    right:none;
  }
  .el-input__inner {
    padding-left:35px;
    padding-right:none;
  }
  `}

  ${({ theme }) => theme && `
    .el-input__inner:focus {
      border-color: ${({theme}) => lighten(0.5, theme.bodyBackground)};
    }
    `
  }
  .el-input.is-disabled .el-input__inner {
    text-align: center;
    background-color: rgba(239,242,247,0.05);
    font-size: 20px;
  }
`
