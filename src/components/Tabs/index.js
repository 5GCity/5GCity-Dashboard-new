/**
 * Tabs Component
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */

import styled from 'styled-components'
import { Tabs } from 'element-react'

const Tab = styled(Tabs)`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Open Sans";
  background-color: #404F57;

.el-tabs__active-bar {
  height: 3px;
  background-color: rgba(140,193,78,1);
}

.el-tabs__item.is-active {
  color: #fff;
}

.el-tabs__item {
  height:56px;
  line-height:56px;
  color: #89979F;
  font-weight: bold;
}

.el-tabs__header {
  border-bottom: 1px solid rgba(137,151,159,0.2);
  margin: 0;
}

.el-tabs__nav-scroll {
  display: flex;
  align-items: center;
  justify-content: left
}

.el-tabs__content {
  margin-bottom: 0;
  flex: 1 auto;
}
`

const Pane = styled(Tabs.Pane)`
background: transparent;
`
Tab.Pane = Pane

export default Tab
