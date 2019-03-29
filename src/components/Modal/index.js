/**
 * Modal Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import styled from 'styled-components'
import { Dialog } from 'element-react'

const Body = Dialog.Body
const Footer = Dialog.Footer

const Modal = styled(Dialog)`
  background-color: transparent;

  .el-dialog__header{
    background-color: #404F57;
    border-radius: 6px 6px 0 0;
    padding: 20px 24px;
  }

  .el-dialog__title{
    color: ${({theme}) => theme.primaryColor};
    font-family: ${({theme}) => theme.fontDin};
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.5px;
  }

  .el-dialog__body{
    background-color: ${({theme}) => theme.bodyBackground};
    box-shadow: 0 0 50px 0 rgba(0,0,0,0.2);
    color: white;
  }

  .el-dialog__footer{
    border-radius: 0 0 6px 6px;
    background-color: #404F57;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: ${({theme}) => theme.secondaryColor};
  }
`
Modal.Footer = Footer
Modal.Body = Body

export default Modal
