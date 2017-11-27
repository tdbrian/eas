import React, { Component } from 'react'
import { withAuth } from '@okta/okta-react'

export default withAuth(class Dashboard extends Component {
  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
})
