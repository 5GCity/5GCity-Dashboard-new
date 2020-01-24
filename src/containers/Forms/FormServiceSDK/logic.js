/**
 * FormServiceSDK Container Logic
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */

import { kea } from 'kea'
// import { put } from 'redux-saga/effects'
// import { } from 'config'
// import { } from 'utils'
// import { } from './utils'

// import PropTypes from 'prop-types'
// import * as Check from 'validations'

/** Logic */
import AppLogic from 'containers/App/logic'
import PageTitleOrganizationLogic from 'containers/PageTitleOrganization/logic'
import ComposerFormLogic from 'containers/ComposerForm/logic'

export default kea({
  path: () => ['scenes', 'containers', 'FormServiceSDK'],

  connect: {
    actions: [
      AppLogic, [
        'addLoadingPage',
        'removeLoadingPage'
      ],
      ComposerFormLogic, [
        'setValueParameters',
        'addParameter',
        'removeParameter',
        'change',
        'nextStep',
        'prevStep',
        'submit'
      ]
    ],
    props: [
      PageTitleOrganizationLogic, [
        'organizations'
      ],
      ComposerFormLogic, [
        'form',
        'currentStep',
        'previousButton',
        'buttonSubmit'
      ]
    ]
  },

  actions: () => ({

  }),

  reducers: ({ actions }) => ({

  }),

  takeLatest: ({ actions, workers }) => ({

  }),

  workers: {

  }

})
