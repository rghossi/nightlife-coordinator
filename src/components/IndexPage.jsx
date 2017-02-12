import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { selectLocation } from '../actions';


class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		e.preventDefault();
		const { dispatch } = this.props
		console.log(this.input.value);
		dispatch(selectLocation(this.input.value));
	}

	render() {
		const { selectedLocation } = this.props
		return (
			<form onSubmit={this.handleSearch}>
		    <FormGroup>
		      <InputGroup>
		      	<FormControl inputRef={(input) => this.input = input} defaultValue={selectedLocation} type="text" placeholder="Enter your location" />
		        <InputGroup.Button>
		          <Button type="submit">Search</Button>
		        </InputGroup.Button>
		      </InputGroup>
		    </FormGroup>
		    </form>
		)
	}
}

IndexPage.propTypes = {
  selectedLocation: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedLocation, placesNearLocation } = state
  const {
    isFetching,
    lastUpdated,
    items: places
  } = placesNearLocation[selectedLocation] || {
    isFetching: true,
    items: []
  }

  return {
    selectedLocation,
    places,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(IndexPage)