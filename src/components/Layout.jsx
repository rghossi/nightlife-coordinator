import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Navbar, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isLoggedIn, logout } from '../actions';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    const { dispatch } = this.props
    dispatch(logout());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(isLoggedIn());
    this.setState({loaded: true});
  }

  render() {
    const { dispatch, isAuthenticated, user, isFetching } = this.props
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Nightlife Coordinator App</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              {this.state.loaded && !isFetching && !isAuthenticated && <a href="/api/login">Login</a>}
              {this.state.loaded && !isFetching && isAuthenticated && <a href="" onClick={this.handleLogout}>Logout</a>}
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
        <footer className="footer">
          <Grid>
            <Row>
            <p className="text-muted">
              Demo SPA to showcase <strong>React</strong>, <strong>Redux</strong>, <strong>Node</strong>, <strong>Express</strong> and <strong>MongoDB</strong>.
              <span className="pull-right"><small><a className="google-link" target='_blank' href="https://www.google.com/intl/en/policies/terms/">Google Terms of Service</a><a className="google-link" target='_blank' href="https://www.google.com/policies/privacy/">Google Privacy Policy</a></small>
              <img src="https://developers.google.com/places/documentation/images/powered-by-google-on-white.png" alt="Powered by Google"/></span>
            </p>
            </Row>
          </Grid>
        </footer>
      </div>
    );
  }
}

Layout.propTypes = {
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { auth } = state
  const { user, isAuthenticated, isFetching } = auth

  return {
    isAuthenticated,
    isFetching,
    user
  }
}

export default connect(mapStateToProps)(Layout)