/**
 * Collapse Component
 * Please write a description
 *
 */
import React from 'react'
import styled from 'styled-components'
import { Collapse } from 'element-react'

export default ({ children, ...props }) => (
  <Wrapper>
    <Collapse {...props}>
      {children && children.map((child, i) =>
        <Collapse.Item
          key={i}
          title={child.props && createTitle(child.props)}
          name={child.props && child.props.name}
      >
          {child}
        </Collapse.Item>
    )}
    </Collapse>
  </Wrapper>
)

const createTitle = props => {
  return (
    <React.Fragment>
      {props.title && props.title}
      {props.onClick &&
      <Icon onClick={(e) => {
        e.stopPropagation()
        props.onClick('AddNew')
      }
      } >
        {props.icon &&
        props.icon
      }
      </Icon>
  }
    </React.Fragment>
  )
}

const Wrapper = styled.div`
  .el-collapse {
    border: 0px solid transparent;
  }
  .el-collapse-item__header {
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    background-color: #324148;
    font-family: ${({theme}) => theme.fontFamily};
    color: ${({theme}) => theme.secondaryColor};
    cursor: pointer;
    border-bottom: none;
    font-size: 14px;
    border-radius: none;
  }
  .el-collapse-item__wrap{
    background-color: transparent;
    border-bottom: none;
    color: white;
  }
  .el-collapse-item__content{
    color: white;
    padding: 5px;
  }
`
const Icon = styled.span`
  float: right;
  margin-right: 9px;
`
