/**
 * Progress Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import styled from 'styled-components'
import { Progress } from 'element-react'

export default styled(Progress)`

witdh:100%;

.el-progress-bar__inner {
  background-color: #8CC14E;
  border-radius:0px;
}

${({status}) => status === 'warning' && `
.el-progress-bar__inner {
  background-color: #DDD16C;
  border-radius: 0px;
}
`}

${({status}) => status === 'danger' && `
.el-progress-bar__inner {
  background-color: #DD6C6C;
  border-radius: 0px;
}
`}

.el-progress-bar__outer {
  border-radius: 0px;
  background-color: rgba(137,151,159,0.15);

  height: 8px !important;
}
`
