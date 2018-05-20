import * as React from 'react'

import styled from '../Theme/style';
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSpinner,
)

export class ReactFontAwesome extends React.Component {
  render() {
    return (
      <div className="spinner-wrapper" >
        <FontAwesomeIcon
          className="spinner-icon"
          icon={['fas', 'spinner']}
          pulse
          spin
          fixedWidth
          size="6x"
        />
      </div>
    )
  }
}

export default ReactFontAwesome;