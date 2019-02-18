/**
 * Loading Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import styled from 'styled-components'
import { Loading } from 'element-react'

export default styled(Loading)`
  height: 100vh;

> div:first-child {
  background-color: transparent !important;
}

.el-loading-spinner .path {
  stroke: ${({ theme }) => theme.primaryColor };
  stroke-width: 4;
}
`
