/**
 * HeaderNav Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'

/* Components */
import Switch from 'components/Switch';
import Select from 'components/Select';
import { Button } from 'element-react'

export default ({ children, type, buttonBack, name, leftContent, navigateBack, ...props }) => (
  <Wrapper type={type}>
    <RightContainer>
      {buttonBack &&
        <ButtonIcon onClick={() => navigateBack()}>{buttonBack}</ButtonIcon>
      }
      {name &&
        <Title>{name}</Title>
      }
    </RightContainer>
    <LeftContainer>
      {leftContent && leftContent.map((el) =>
        <React.Fragment key={el.id}>
          {el.type === 'switch' && <Switch title={el.name} name={el.name} onText="" offText="" onColor="#8CC14E" offColor="#89979F"/>}
        </React.Fragment>
      )}
      {leftContent && leftContent.map((el) =>
        <React.Fragment key={el.id}>
          {el.type === 'select' && <Select placeholder={el.placeholder} title={el.name} type={el.style} options={el.options} headerNav /> }
        </React.Fragment>
      )}
      {leftContent && leftContent.map((el) =>
        <React.Fragment key={el.id}>
          {el.type === 'shopCart' && <ButtonShop onClick={props.clickFunction} icon={'check'} /> }
        </React.Fragment>
      )}
    </LeftContainer>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  display:flex;
  justify-content: space-between;

  ${({ type }) => type === 'transparent' ?`
    height: 56px;
    background-color: rgba(34,46,52,0.8);
  `:`
    height: 80px;
    background-color: #404F57;
    box-shadow: inset 0 1px 0 0 rgba(137,151,159,0.2), inset 0 -1px 0 0 rgba(137,151,159,0.2), 0 -5px 20px 0 rgba(0,0,0,0.5);
  `}
`
const RightContainer = styled.div`
  display: flex;
  align-items: center;
`
const LeftContainer = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
`

const ButtonIcon = styled.i`
  margin-left: 24px;
  cursor: pointer;
`

const ButtonShop = styled(Button)`
  border: 0px;
  background: transparent;
  color: white;
`

const Title = styled.p`
  margin-left: 32px;
  font-family: ${({ theme }) => theme.fontDin};
  color: white;
  font-size: 20px;
  line-height: 22px;
`
