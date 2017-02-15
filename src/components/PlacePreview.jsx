import React, { Component } from 'react';
import { Media, Button } from 'react-bootstrap';

export default class PlacePreview extends Component {
	render() {
		const { item, user, handleButtonClick } = this.props
		let index = -1
		if (user && user.going)
			index = user.going.indexOf(item.place_id);
		return (
			<Media>
		      <Media.Left align="middle">
		        <img width={64} height={64} src={item.icon} alt="Image"/>
		      </Media.Left>
		      <Media.Body>
		        <Media.Heading>{item.name}</Media.Heading>
			    <p>{item.formatted_address}</p>
			    {user && index === -1 && <Button onClick={() => handleButtonClick(item.place_id)} bsStyle="primary">I wanna go</Button>}
			    {user && index > -1 && <Button onClick={() => handleButtonClick(item.place_id)} bsStyle="warning">Changed your mind? Click here</Button>}
		      </Media.Body>
		    </Media>
		)
	}
}