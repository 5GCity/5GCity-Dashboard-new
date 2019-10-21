/**
 * Slider Component
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import styled from 'styled-components'
import { Slider } from 'element-react'
import { lighten } from 'polished'

export default styled(Slider)`

.el-slider__button-wrapper{
    height:16px;
    width:16px;
    top: -12px;
}

.el-slider__runway{
    background-color: #89979F;
    height: 2px;
}

.el-slider__bar {
    background-color: transparent;
    height:2px;
}

.el-slider__button {
    height: 16px;
    width:16px;
    border: 2px solid #37474F;
    background-color: rgba(140,193,78,0.6);
}

.el-slider__stop {
    height: 6px;
    width: 6px;
    top:-2px;
    background-color: #89979F;
}

.el-tooltip__popper.is-dark {
    background: ${lighten(0.1, '#89979F')};
    color:#fff;
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: ${lighten(0.1, '#89979F')};

}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: ${lighten(0.1, '#89979F')};
}
`
