import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, SelectTag } from "../Form";
// import { BookList, BookListItem } from "../BookList";
import { Container, Row, Col } from "../Grid";
import { List, ListItem } from "../List";
import DeleteBtn from "../DeleteBtn";
import Modal from "../Modal";
import Button from "../Button"
// import { Button } from 'react-bootstrap';


// document.getElementsByClassName("card-body").addEventListener("click", function(){
// document.getElementById("results-modal").modal("toggle")
// });

// $(document).on("click", ".card-body", function () {
// $("#results-modal").modal("toggle");
// })



class Inputdata extends Component {
    state = {
        locations: [],
        locationSearch: "",
        name: "",
        message: "",
        feature: "",
        show: false,
    };

    handleShow = this.handleShow.bind(this);
    handleClose = this.handleClose.bind(this);

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        console.log("hi")
        this.setState({ show: true });
    }



    componentDidMount() {
        this.loadLocation();
    }

    loadLocation = () => {
        API.getLocations()
            .then(res =>
                // console.log(res.data)
                this.setState({ locations: res.data, name: "", locationSearch: "", message: "", feature: "" })
            )
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
        //console.log(this.state.feature)
        //console.log(this.state.name)
        setTimeout(() =>
            this.loadLocation()
            , 3000);
        if (this.state.name && this.state.locationSearch) {
            API.searchLocations(
                this.state.locationSearch, {
                    name: this.state.name,
                    message: this.state.message,
                    feature: this.state.feature
                })
                .then(res => {
                    this.loadLocation();
                })
                .catch(err => console.log(err))
        }
        this.loadLocation();
    };

    deleteLocation = id => {
        API.deleteLocation(id)
            .then(res => this.loadLocation())
            .catch(err => console.log(err));
    };

    modalLocation = id => {
        console.log(id)
        console.log("hello")
    };

    render() {
        return (
            <div>
                <Jumbotron />
                <Container>
                    <Row>
                        <Col size="md-12">
                            <form>

                                <Input
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    placeholder="Name"
                                />
                                <Input
                                    name="locationSearch"
                                    value={this.state.locationSearch}
                                    onChange={this.handleInputChange}
                                    placeholder="Input Location"
                                />
                                <TextArea
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.handleInputChange}
                                    placeholder="Message"
                                />

                                <SelectTag
                                    name="feature"
                                    value={this.state.feature}
                                    onChange={this.handleInputChange}
                                />

                                <FormBtn
                                    disabled={!(this.state.name && this.state.locationSearch)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Submit
                                </FormBtn>

                            </form>
                        </Col>

                        <Col size="md-12 sm-12">
                            <h1>Location Data List</h1>
                            {this.state.locations.length ? (
                                <List>
                                    {this.state.locations.map(location => (
                                        <ListItem key={location._id} >
                                            <DeleteBtn onClick={() => this.deleteLocation(location._id)} />
                                            <h3
                                                // onClick={() => this.modalLocation(location._id)}
                                                onClick={this.handleShow}
                                            >Feature: {location.feature === "water" ? "Water" : location.feature === "bathroom" ? "Bathroom" : "Bicycle Rack"}</h3>
                                            <p>
                                                <span>
                                                    <strong>{location.address}</strong> add by <strong>{location.name}</strong>
                                                </span>
                                            </p>
                                            <p><span><strong>Longitude:</strong> {location.longitude}, <strong>Latitude:</strong> {location.latitude}</span></p>
                                            <p><strong>Message:</strong> {location.message}</p>
                                        </ListItem>

                                    ))}
                                </List>
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}
                        </Col>
                    </Row>


                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Save Changes
            </Button>
                        </Modal.Footer>
                    </Modal>



                </Container>
            </div>
        );
    }
}


export default Inputdata;