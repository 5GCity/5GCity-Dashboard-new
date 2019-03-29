/**
 * Catalogue Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { catalogueUtils } from 'utils'
import { Start, OtherComponent, Stop, Plus, Remove, VirtualSwitch } from 'components/Icons'

export default ({ ...props }) => (
  <SVGContainer
    {...props}
    onClick={() => !props.disabled && props.onClick(getProps(props))}>
    <Group>
    {props.version &&
      <Version x="6" y="16">{props.version}</Version>
    }
    {props.type === "start" &&
      <Start transform="translate(33,20)" />
    }
    {props.type === "stop" &&
      <Stop transform="translate(33,20)" />
    }
    {props.type === "VS" &&
      <VirtualSwitch transform="translate(33,20)" />
    }
    {props.type === "VNF" &&
      <OtherComponent transform="translate(33,20)" {...props} />
    }
    {props.name &&
      <Name>
        {catalogueUtils(props.name)}
      </Name>
    }
    <Rect />
    { !props.disabled &&
    <PlusCatalogue transform="translate(33,40)" />
    }
    { props.disabled &&
    <RemoveCatalogue transform="translate(33,40)" />
    }
    </Group>
  </SVGContainer>
)

const getProps = props => {
  const { name, version, type, colortext, circlefill } = props
  const object = {};
  object.name = name;
  object.type = type ? type.toLowerCase() : name.toLowerCase();
  if(version) {
    object.version = version;
  }
  if(colortext) {
    object.colortext = colortext;
  }
  if(circlefill) {
    object.circlefill = circlefill;
  }
  return object;
}

const Group = styled.g``

const PlusCatalogue = styled(Plus)`
  visibility: hidden;
`

const RemoveCatalogue = styled(Remove)`
  visibility: visible;
`

const Rect = styled.rect`
  fill: transparent;
  width: 100px;
  height: 106px;
  rx: 10%;
  stroke-width: 1.5;
  stroke-dasharray: 5;
  stroke: ${({theme}) => rgba(theme.secondaryColor, 0.3)};
`

const Version = styled.text`
font-family: ${({ theme }) => theme.fontFamily };
fill: ${({ theme }) => theme.secondaryColor };
font-size: 10px;
`

const Name = styled.text`
  text-anchor: middle;
  font-family: ${({ theme }) => theme.fontFamily };
  fill: ${({ theme }) => theme.secondaryColor };
  font-size: 12px;
`
const SVGContainer = styled.svg`
  width: 100px;
  height: 106px;
  cursor: pointer;
  margin: 8px 4px;
  &:hover {
    ${Rect} {
      fill: ${({theme}) => rgba(theme.secondaryColor, 0.1)};
    }
    ${PlusCatalogue} {
      visibility: visible;
    }
  }

  ${props => props.disabled && `
    cursor: not-allowed;
    `
  }
`
