/**
 * AlertMessages Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Icon } from 'element-react'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    {/* <Close onClick={() => props.close()}>&times;</Close> */}
    <Circle>
      <IconRemove name={'close'} />
    </Circle>
    <Container>
      <Title>{props.title}</Title>
    </Container>
      {props.location &&
      <Container>
        <SubTitle>Location:</SubTitle>
        <Location>{props.location}</Location>
      </Container>
      }
      <Container>
        <SubTitle>Description:</SubTitle>
        <Description>{props.description}</Description>
      </Container>
  </Wrapper>
)

const Wrapper = styled.div`
  height: 108px;
  width: 320px;
  opacity: 0.98;
  border-radius: 6px;
  background-color: #EFF2F7;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.15);
  margin: 10px auto;
`
const Circle = styled.div`
  height:48px;
  width: 48px;
  background-color:#D84F4F;
  border-radius: 50%;
  position: relative;
  top: 24px;
  left: -24px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 0 10px 0 rgba(216,79,79,0.5);
`
const Title = styled.p`
  margin: 4px 0;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontDin };
  letter-spacing: 0.5px;
  line-height: 20px;
  color: #D84F4F;
  font-weight: bold;
`
const Location = styled.span`
  font-size: 12px;
  font-weight: 600;
  width: 184px;
  line-height: 16px;
  font-family: ${({ theme }) => theme.fontFamily };
`
const Description = styled.div`
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  height: 32px;
  width: 184px;
  line-height: 16px;
  font-family: ${({ theme }) => theme.fontFamily };
`
/* const Close = styled.div`
  position: relative;
  top: 0;
  z-index: 2;
  text-align: center;
  float: right;
  height: 32px;
  font-size: 20px;
  width: 32px;
  color: #89979F;
  cursor: pointer;
` */

const Container = styled.div`
  text-align: left;
  position: relative;
  top: -40px;
  margin-left: 40px;
`
const SubTitle = styled.p`
  font-family: ${({ theme }) => theme.fontFamily };
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  display: inline-block;
  color: #37474F;
  width: 80px;
  margin: 4px 0;
`
const IconRemove = styled(Icon)`
  color:#fff;
  position: relative;
  top: 13px;
  left: 15px;
`
