import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

export default class IndexPage extends React.Component {
	search(e) {
		e.preventDefault();
		//DO search using search api
	}

	render() {
		return (
			<form onSubmit={this.search}>
		    <FormGroup>
		      <InputGroup>
		      	<FormControl type="text" placeholder="Enter your location" />
		        <InputGroup.Button>
		          <Button type="submit">Search</Button>
		        </InputGroup.Button>
		      </InputGroup>
		    </FormGroup>
		    </form>
		)
	}
}