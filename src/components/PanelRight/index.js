/**
 * Sidebar Component
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { opacify } from 'polished';

import { EditIcon } from 'components/Icons'
import RoundButton from 'components/RoundButton'

export default ({ children, headerData, headerIcon, closeNav, action, bottomPanel, show, container, ...props }) => (
<React.Fragment>
{show ?
<Wrapper {...props}>
  <RightNav>
    <CloseContainer onClick={() => closeNav()}> &times; </CloseContainer>
    {headerData &&
    <Header>
      <RoundButton icon={headerIcon} size={props.size} />
      <HeaderContainer>
      <Subtitle>
      {headerData.subtitle}
      </Subtitle>
      <Title>
      {headerData.title}
      </Title>
      <EditIcon height={20} width={20} onClick={(data) => action(data)}/> {/* &gt; */}
      </HeaderContainer>
    </Header>
    }
    <Line/>
    {container &&
    <Container>
      {container}
    </Container>
    }
    {bottomPanel &&
    <Bottom>
      <BottomContainer>
      {bottomPanel}
      </BottomContainer>
    </Bottom>
    }
 </RightNav>
</Wrapper>
: null
}
</React.Fragment>
)

const Wrapper = styled.div`
  position: fixed;
	height: 100%;
  z-index: 1;
	width: 100%;
	background-color: rgba(55,71,79, 0.7);

`

const RightNav = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
	height: 100%;
	width: 268px;
	background: ${opacify(0.98,'#37474F')};
  position: fixed;
  right: 0px;

`
const Line = styled.div`
box-shadow: 0 0 50px 0 rgba(0,0,0,0.2);
`

const CloseContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  text-align: center;
  left: -31px;
  height: 32px;
  font-size: 20px;
  width: 32px;
  color: #89979F;
  background-color: #37474F;
  box-shadow: inset -1px 0 0 0 rgba(0,0,0,0.15), 0 0 50px 0 rgba(0,0,0,0.2);
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 32px 16px 12px 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(239,242,247,0.1);
`
const Subtitle = styled.span`
  ${({ theme }) =>  theme && `
  font-family: ${theme.thirdFont};
  `}
  display: block;
  font-size: 10px;
  letter-spacing: 0.5px;
  margin: 0 0 0 8px;
  color: #89979F;
`
const Title = styled.span`
  paddging: 27px 10px 0 24px;
 ${({ theme }) =>  theme && `
  font-family: ${theme.secondaryFont};
  `}
  font-size: 20px;
  color: #fff;

`
const HeaderContainer = styled.div``

const Container = styled.div`
  overflow-y: auto;
  margin: 27px 20px 0 20px;
  max-height: calc(100vh - 200px);
  `

const Bottom = styled.div`
  background-color: rgba(255,255,255,0.05);  
  height: 80px;
  width: 100%;
  position: absolute;
  bottom: 80px;
`
const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`