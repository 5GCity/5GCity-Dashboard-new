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
      <StepContainer>
        {children && children.props &&
        <Item>
          <Icon activeStep={children.props.active}>
            <Circle cx={12} cy={12} r={12} />
            <Step x={'50%'} y={'50%'} dy={'0.1em'}>
              {children.props.step}
            </Step>
          </Icon>
          <Title>{children.props.description}</Title>
        </Item>
        }
        {children && children.length > 0 && children.map((child, i) =>
          <Item
            key={i}
        >
            <Icon>
              <Circle
                cx='12'
                cy='12'
                r='12'
                active={child.props.active || false}
                validation={child.props.validation || null}
          />
              <Step
                x='50%'
                y='50%'
                dy='0.1em'
                active={child.props.active || false}
                validation={child.props.validation || null}
          >
                {child.props.step}
              </Step>
            </Icon>
            <Title>{child.props.description}</Title>
          </Item>
        )}
      </StepContainer>
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
  cursor: pointer;
`
const Item = styled.div`
  display: flex;
  &:first-child {
    margin-top: 64px;
  }
  margin-top: 28px;
  margin-left: 30px;
`
const Title = styled.h2`
  margin-left: 12px;
  font-size: 14px;
  color: white;
  letter-spacing: 1px;
  line-height: 0px;
  font-family: ${({ theme }) => theme.fontDinExp};
  font-weight: bold;
  text-transform: uppercase;
`

const Icon = styled.svg`
  width: 24px;
  height: 24px;
`
const Circle = styled.circle`
  ${({active}) => active && `
    fill: white;
  `}
  ${({validation, active}) => validation === 'success' && !active && `
    fill: #8CC14E;
    opacity: 0.3;
  `}
  ${({validation, active}) => validation === 'danger' && !active && `
    fill: #DD6C6C;
    opacity: 0.3;
  `}
  ${({validation, active}) => validation === 'warning' && !active && `
    fill: orange;
    opacity: 0.3;
  `}
  ${({validation, active}) => !validation && !active && `
  fill: #5A666D;
`}
`
const Step = styled.text`
  ${({activeStep}) => activeStep && `
    stroke: ${({ theme }) => theme.bodyBackground};
  `}
  ${({activeStep}) => !activeStep && `
    stroke: #fff;
  `}
  line-height: 12px;
  font-size: 12px;
  stroke-width: 1px;
  text-anchor: middle;
  alignment-baseline: middle;
  ${({active}) => active && `
    stroke: #324148;
  `}
  ${({validation, active}) => validation === 'success' && !active && `
    stroke: #8CC14E;
  `}
  ${({validation, active}) => validation === 'danger' && !active && `
    stroke: #DD6C6C;
  `}
  ${({validation, active}) => validation === 'warning' && !active && `
    stroke: orange;
  `}
  ${({validation, active}) => !validation && !active && `
    stroke: white;
  `}

`
