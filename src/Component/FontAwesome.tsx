import * as React from 'react'

// Importing types from the API library along with other exports
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
  library
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare
)

// We're only adding faCoffee to the library so we can look it up.
// And we're only doing that to demonstrate how the API types might be used.
// This is not a realistic scenario. You wouldn't normally do things in such a round about way.
// It's really just to demonstrate use of the types.

export class ReactFontAwesome extends React.Component {
  render() {
    return (
      <div >
        <FontAwesomeIcon
          icon={['fas', 'spinner']}
          pulse
          spin
          fixedWidth
          size="4x"
        />
      </div>
    )
  }
}

export default ReactFontAwesome;