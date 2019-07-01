import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import Input from "../Input";
import Button from "../Button";
import API from "../../utils/API";
import { List, ListItem } from "../ListItem";
import { Container, Row, Col } from "../Grid";

class Search extends Component {
    state = {
        venues: [],
        locationSearch: "",
        message:""
    };

    componentDidMount() {
        this.loadSearch();
    }

    loadSearch = () => {
        API.getLocationsSearch()
            .then(res => {
                this.setState({ venues: res.data })
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        // When the form is submitted, prevent its default behavior, get update state
        event.preventDefault();

        API.searchVenues(this.state.locationSearch).catch(err => console.log(err))

        setTimeout(() =>
            API.getLocationsSearch()
                .then(res => {
                    // console.log(res.data.items)
                    // console.log(this.state.locationSearch)
                    // console.log(res.data)
                    this.setState({ venues: res.data })
                })
                .catch(err => console.log(err))
            , 3000);
    };

    handleSaved = id => {
        // console.log(id)
        // alert("Saved venue!")
        this.loadSearch();
        API.savedVenue(id)
            .then(res => {
                // console.log(res)
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <Jumbotron />
                <Container>
                    <Row>
                        <Col size="md-12">
                            <form>
                                <Container>
                                    <Row>
                                        <Col size="xs-9 sm-10">
                                            <Input
                                                name="locationSearch"
                                                value={this.state.locationSearch}
                                                onChange={this.handleInputChange}
                                                placeholder="Search for Venue"
                                            />
                                        </Col>
                                        <Col size="xs-3 sm-2">
                                            <Button
                                                onClick={this.handleFormSubmit}
                                                type="success"
                                                className="input-lg"
                                            >
                                                Search
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="xs-12">
                            {!this.state.venues.length ? (
                                <h1 className="text-center">No Search Display</h1>
                            ) : (
                                    <List>
                                        {this.state.venues.map(venue => {
                                            if (venue.saved === false) {
                                                return (
                                                    < ListItem
                                                        key={venue._id}
                                                        name={venue.name}
                                                        address={venue.address}
                                                        category={venue.category}
                                                        longitude={venue.longitude}
                                                        latitude={venue.latitude}
                                                        onClick={() => this.handleSaved(venue._id)}
                                                    />
                                                )
                                            };
                                        })}
                                    </List>

                                )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Search;
