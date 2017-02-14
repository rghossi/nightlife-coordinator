import React, { Component } from 'react';
import { Media, Button } from 'react-bootstrap';

export default class PlacePreview extends Component {
	render() {
		const {item} = this.props
		return (
			<Media>
		      <Media.Left align="middle">
		        <img width={64} height={64} src={item.icon} alt="Image"/>
		      </Media.Left>
		      <Media.Body>
		        <Media.Heading>{item.name}</Media.Heading>
			        <p>{item.formatted_address}</p>
			        <Button bsStyle="primary">Going</Button>
		      </Media.Body>
		    </Media>
		)
	}
}