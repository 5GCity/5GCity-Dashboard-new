/**
 * Modal Component
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Dialog } from 'element-react'


export default ({ children, headerTitle, footerContent, bodyContent, ...props }) => (
  <Wrapper {...props}>
    <Dialog.Body>
      {bodyContent}
    </Dialog.Body>
    <Dialog.Footer className="dialog-footer">
      {footerContent}
    </Dialog.Footer>
  </Wrapper>
)

const Wrapper = styled(Dialog)`
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
  }

  .el-dialog__footer{
    border-radius: 0 0 6px 6px;
    background-color: #404F57;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: ${({theme}) => theme.secondaryColor};
  }

`
