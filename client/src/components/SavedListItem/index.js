import React from "react";
// import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import "./styles.css";
// Exporting both List and ListItem from this file

// RecipeList renders a bootstrap list item
export function List({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// ListItem renders a bootstrap list item containing data from the recipe api call
export function ListItem({
  // image = "https://placehold.it/300x300",
  name,
  address,
  category,
  longitude,
  latitude,
  onClick,
  showMap
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
        <Col size="xs-12 sm-11">
            <h3 className="showMap" onClick={showMap}>{name}</h3>
            <p><strong>Address: </strong> {address}</p>
            <p><strong>Category: </strong> {category}</p>
            <p><strong>Longitude: </strong>{longitude}, <strong>Latitude: </strong>{latitude}</p>
            <a rel="noreferrer noopener" target="_blank" href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${name}`}>
              Go to Venue!
            </a>
            <button className="btn btn-lg btn-warning savedButton ml-5 float-right" type="button" onClick={onClick}>Delete</button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

