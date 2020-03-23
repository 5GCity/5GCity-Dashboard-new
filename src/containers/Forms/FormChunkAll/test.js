/**
<<<<<<< HEAD:src/containers/Forms/formSDKActions/test.js
 * formSDKActions Container Tests
=======
 * FormChunkAll Container Tests
>>>>>>> 4fc8fe91fef6c7c0c3ee07916d225d3649f34083:src/containers/Forms/FormChunkAll/test.js
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React from 'react'
import renderer from 'react-test-renderer'
<<<<<<< HEAD:src/containers/Forms/formSDKActions/test.js
import formSDKActions from './index'
=======
import FormChunkAll from './index'
>>>>>>> 4fc8fe91fef6c7c0c3ee07916d225d3649f34083:src/containers/Forms/FormChunkAll/test.js
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer
<<<<<<< HEAD:src/containers/Forms/formSDKActions/test.js
    .create(<formSDKActions />)
=======
    .create(<FormChunkAll />)
>>>>>>> 4fc8fe91fef6c7c0c3ee07916d225d3649f34083:src/containers/Forms/FormChunkAll/test.js
    .toJSON()

  expect(tree).toMatchSnapshot()
})
