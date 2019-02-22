/**
 * ComposerMenu Container Utils
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatiarca@ubiwhere.com>
 */

import faker from 'faker'
import { NODE_TYPE } from './config_d3'

export const newStop = {
  id: `test${faker.random.number()}`,
  type: "stop",
  x: 30,
  y: 100,
  fill: NODE_TYPE.STOP.color,
  h: NODE_TYPE.STOP.h,
  w: NODE_TYPE.STOP.w,
  border: NODE_TYPE.STOP.border,
  left: { x: 0, y: NODE_TYPE.STOP.h / 2 }
};


add(newStop);
