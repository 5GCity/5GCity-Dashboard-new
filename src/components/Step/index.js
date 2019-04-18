/**
 * Steps Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

export default ({ children, ...props }) => (
  <Wrapper>
    {children &&
    <React.Fragment>
      <StepContainer>
      {children && children.props &&
        <Item>
          <Icon activeStep={children.props.active}>
            <Circle cx="12" cy="12" r="12" />
            <Step x="50%" y="50%" dy="0.1em">{children.props.step}</Step>
          </Icon>
          <Title>{children.props.description}</Title>
        </Item>
        }
        {children && children.length > 1 && children.map(child =>
        <Item>
        <Icon activeStep={child.props.active}>
          <Circle cx="12" cy="12" r="12" />
          <Step x="50%" y="50%" dy="0.1em">{child.props.step}</Step>
        </Icon>
        <Title>{child.props.description}</Title>
      </Item>
        )}
      </StepContainer>
      <Content>
        {children}
      </Content>
    </React.Fragment>
    }
  </Wrapper>
)
const Wrapper = styled.div`
  display: flex;
  background-color: #324148;
`

const StepContainer = styled.div`
  width: 320px;
  height: 100vh;
  background-color:${({ theme }) => theme.bodyBackground };
`
const Item = styled.div`
  display: flex;
  justify-content:center;
  &:first-child {
    margin-top: 64px;
  }
  margin-top: 28px;
`
const Title = styled.h2`
  margin-left: 12px;
  font-size: 14px;
  color: white;
  letter-spacing: 1px;
  line-height: 0px;
  font-family: ${({ theme }) => theme.fontDinExp };
  font-weight: bold;
  text-transform: uppercase;
`

const Icon = styled.svg`
  width: 24px;
  height: 24px;
`
const Circle = styled.circle`
  ${({activeStep}) => activeStep && `
    fill: white;
  `}
  ${({activeStep}) => !activeStep && `
    fill: #5A666D;
`}
`
const Step = styled.text`
  ${({activeStep}) => activeStep && `
    stroke: ${({ theme }) => theme.bodyBackground };
  `}
  ${({activeStep}) => !activeStep && `
    stroke: #fff;
  `}
  line-height: 12px;
  font-size: 12px;
  stroke-width: 1px;
  text-anchor: middle;
  alignment-baseline: middle;
`
const Content = styled.div`
  margin-top: 64px;
  margin-left: 40px;
  width: 640px;
`
