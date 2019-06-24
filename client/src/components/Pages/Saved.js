import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
// import Nav from "../Nav";
// import Input from "../Input";
// import Button from "../Button";
import API from "../../utils/API";
import { BookList, BookListItem } from "../SavedBookList";
import { Container, Row, Col } from "../Grid";

class Search extends Component {
    state = {
        books: [],
        // bookSearch: ""
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res => {
                this.setState({ books: res.data })
            })
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
      };

    render() {
        return (
            <div>
                {/* <Nav /> */}
                <Jumbotron />
                <Container>
                    <Row>
                        <Col size="xs-12">
                            {!this.state.books.length ? (
                                <h1 className="text-center">No Book Display</h1>
                            ) : (
                                    <BookList>
                                        {this.state.books.map(book => {
                                            if (book.saved === true) {
                                                return (
                                                    < BookListItem
                                                        key={book._id}
                                                        title={book.title}
                                                        link={book.link}
                                                        authors={book.authors}
                                                        description={book.description}
                                                        image={book.image}
                                                        onClick={() => this.deleteBook(book._id)}
                                                    />
                                                )
                                            };
                                        })}
                                    </BookList>

                                )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Search;
