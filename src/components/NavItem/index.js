/**
 * NavItem Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { Icon } from 'element-react'
import { rgba } from 'polished'
/* import PropTypes from 'prop-types' */

export default ({ children, icon, text, disabled, href, onClick, width, active, ...props }) => (
  <Wrapper
    active={active}
    disabled={disabled}
    onClick={!disabled ? onClick : null}
    width={width}
    to={href}
      >
    <IconItem name={icon} />
    <ItemLabel>{text}</ItemLabel>
  </Wrapper>
    )

const Wrapper = styled.div`
  color: #fff;
  text-align: center;
  cursor: pointer;
  height: ${({props}) => `${props}px`};
  padding: 14px 16px;
  position: relative;
  box-shadow: inset 0 -1px 0 0 ${({theme}) => rgba(theme.secondaryColor, 0.8)};

   :hover {
    background-color: ${({theme}) => rgba(theme.secondaryColor, 0.2)};
  }

  ${({ active }) => active && `
    border-right: 3px solid #8CC14E;
    :after {
      content:'';
      position: absolute;
      border: 30px solid transparent;
      border-right: 30px solid #8CC14E;
      top: 40px;
      right: 0px;
    }
`}


`

const ItemLabel = styled.div`
  line-height: 15px;
  margin-top: 8px;
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fontDin};
`

const IconItem = styled(Icon)`
  font-size:32px;
`
