import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isLoggedIn, logout } from '../actions';

class Layout extends React.Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    const { dispatch, isAuthenticated, user } = this.props
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Nightlife Coordinator App</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              {!isAuthenticated && <a href="/api/login">Login</a>}
              {isAuthenticated && <a href="" onClick={this.handleLogout}>Logout</a>}
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
        <footer className="footer">
          <Grid>
            <p className="text-muted">
              Demo SPA to showcase <strong>React</strong>, <strong>Node</strong>, <strong>Express</strong> and <strong>MongoDB</strong>.
            </p>
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