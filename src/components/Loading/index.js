/**
 * Loading Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

export default ({ children, ...props }) => (
  <Wrapper {...props}>
    <Spinner>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </Spinner>
  </Wrapper>
)

const Wrapper = styled.div`
 ${({ loading }) => loading ? `display:flex;` : 'display:none;' }
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => rgba(theme.secondaryColor, 0.15) };
  justify-content: center;
  align-items: center;
  z-index:999;
`
const Spinner = styled.svg`
  animation: rotate 1s linear infinite;
  width: 50px;
  height: 50px;

  & .path {
    stroke: ${({ theme }) => theme.primaryColor };
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
