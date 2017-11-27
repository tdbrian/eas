import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import './App.css'

import Dashboard from '../dashboard/Dashboard'
import Login from './Login'

function onAuthRequired({ history }) {
  history.push('/login');
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://dev-627580.oktapreview.com/oauth2/default'
            client_id='0oacvrqdy7TlmhDaR0h7'
            redirect_uri={window.location.origin + '/implicit/callback'}
            onAuthRequired={onAuthRequired} >
          <Route path='/' exact={true} component={Dashboard} />
          <Route path='/login' render={() => <Login baseUrl='https://dev-627580.oktapreview.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    )
  }
}