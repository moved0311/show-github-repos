import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class ShowCard extends Component {
  render() {
    return (
        <Card>
        <Card.Body>
          <Card.Title>Title: {this.props.data[0]}</Card.Title>
          {
             this.props.data[1] ? 
              <Card.Subtitle className="mb-2 text-muted">Description: {this.props.data[1]}</Card.Subtitle> :
              <Card.Subtitle className="mb-2 text-muted">no description</Card.Subtitle>
          }
          <Card.Link href={this.props.data[2]}>{this.props.data[2]}</Card.Link>
        </Card.Body>
        </Card>
    )
  }
}
