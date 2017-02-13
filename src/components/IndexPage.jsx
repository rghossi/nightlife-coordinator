import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { selectLocation, fetchPlaces } from '../actions';


class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(e) {
		e.preventDefault();
		const { dispatch } = this.props
		const location = this.input.value;
		dispatch(selectLocation(location));
		localStorage.setItem("location", location);
		dispatch(fetchPlaces(location));
	}

	componentDidMount() {
		const { dispatch, selectedLocation } = this.props
		const location = localStorage.getItem("location");
		console.log(location, selectedLocation);
		if (location && location !== selectedLocation) {
			dispatch(selectLocation(location));
			dispatch(fetchPlaces(location));
		}
	}

	render() {
		const { selectedLocation, items } = this.props
		console.log(this.props);
		return (
			<div>
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
			    <h4>Displaying results for "{selectedLocation}"</h4>
			    <ul>
		    		{items && items.map((item) => <li key={item.id}>{item.name}</li>)}
		    	</ul>
		    </div>
		)
	}
}

IndexPage.propTypes = {
  selectedLocation: PropTypes.string.isRequired,
  places: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedLocation, places } = state
  const {
    isFetching,
    lastUpdated,
    didInvalidate,
    items
  } = places

  return {
    selectedLocation,
    places,
    isFetching,
    lastUpdated,
    items
  }
}

export default connect(mapStateToProps)(IndexPage)