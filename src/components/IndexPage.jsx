import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, FormControl, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { selectLocation, fetchPlaces, updateUser } from '../actions';
import Loader from 'react-loader';
import PlacePreview from './PlacePreview';

class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleSearch(e) {
		e.preventDefault();
		const { dispatch } = this.props
		const location = this.input.value;
		dispatch(selectLocation(location));
		localStorage.setItem("location", location);
		dispatch(fetchPlaces(location));
	}

	handleButtonClick(locationId) {
		const { user, dispatch } = this.props
		let newGoingArray = user.going.slice(0) || [];
		const index = newGoingArray.indexOf(locationId);
		if (index > -1)
			newGoingArray.splice(index, 1);
		else
			newGoingArray.push(locationId);
		user.going = newGoingArray;
		console.log(user);
		dispatch(updateUser(user));
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
		const { selectedLocation, items, isFetching, user } = this.props
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
			    <Loader loaded={!isFetching}>
				    {selectedLocation && <h4>Displaying results for "{selectedLocation}"</h4>}
				    <ListGroup>
			    		{items && items.map((item) => <ListGroupItem className="list-item" key={item.id}><PlacePreview key={item.id} item={item} user={user} handleButtonClick={this.handleButtonClick} /></ListGroupItem>)}
			    	</ListGroup>
		    	</Loader>
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
  const { selectedLocation, places, auth } = state
  const {
    isFetching,
    lastUpdated,
    didInvalidate,
    items
  } = places
  const { user } = auth

  return {
    selectedLocation,
    places,
    isFetching,
    lastUpdated,
    items,
    user
  }
}

export default connect(mapStateToProps)(IndexPage)