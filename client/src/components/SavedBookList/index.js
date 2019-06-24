import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

// Exporting both RecipeList and BookListItem from this file

// RecipeList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// BookListItem renders a bootstrap list item containing data from the recipe api call
export function BookListItem({
  image = "https://placehold.it/300x300",
  title,
  authors,
  description,
  link,
  onClick
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={image} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <p><strong>Authors: </strong> {authors}</p>
            <p><strong>Description: </strong> {description}</p>
            <a rel="noreferrer noopener" target="_blank" href={link}>
              Go to Book!
            </a>
            <button className="btn btn-lg btn-warning savedButton ml-5" type="button" onClick={onClick}>Delete</button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

