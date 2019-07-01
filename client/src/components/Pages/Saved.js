import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import API from "../../utils/API";
import { List, ListItem } from "../SavedListItem";
import { Container, Row, Col } from "../Grid";

import { Button, Modal } from 'react-bootstrap';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiZGF2aWR2bzE5OTAiLCJhIjoiY2p4MmsyOXJsMDAxYTQ4cGg3cHMwcTZkMCJ9.mHHhKy1QIfmGF_TC88vSUg"
});


class Search extends Component {
    state = {
        venues: [],
        show: false,
        addressDB: "",
        nameDB: "",
        longitudeDB: "",
        latitudeDB: "",
    };

    handleShow = this.handleShow.bind(this);
    handleClose = this.handleClose.bind(this);

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(address, name, longitude, latitude) {
        this.setState({ show: true, addressDB: address, nameDB: name, longitudeDB: longitude, latitudeDB: latitude });
    }


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

    deleteVenue = id => {
        API.deleteVenue(id)
          .then(res => this.loadSearch())
          .catch(err => console.log(err));
      };

    render() {
        return (
            <div>
                <Jumbotron />
                <Container>
                    <Row>
                        <Col size="xs-12">
                            {!this.state.venues.length ? (
                                <h1 className="text-center">No Venue Display</h1>
                            ) : (
                                    <List>
                                        {this.state.venues.map(venue => {
                                            if (venue.saved === true) {
                                                return (
                                                    <div>
                                                    < ListItem
                                                        key={venue._id}
                                                        name={venue.name}
                                                        address={venue.address}
                                                        category={venue.category}
                                                        longitude={venue.longitude}
                                                        latitude={venue.latitude}
                                                        onClick={() => this.deleteVenue(venue._id)}
                                                        showMap={() => this.handleShow(venue.address, venue.name, venue.longitude, venue.latitude)}
                                                    />
                                                    {/* <button type="button" className="btn btn-success">Map</button> */}
                                                    </div>
                                                )
                                            };
                                        })}
                                    </List>

                                )}
                        </Col>
                    </Row>


                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}
                        dialogClassName="modal-90w"
                        aria-labelledby="modal-styling-title"
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="modal-styling-title">
                                  <p>{this.state.nameDB}</p>
                                  <p>Address: <span id="notbold">{this.state.addressDB}</span></p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            
                            <Map
                                style="mapbox://styles/mapbox/streets-v11"
                                zoom={[13]}
                                center={[this.state.longitudeDB, this.state.latitudeDB]}
                                containerStyle={{
                                    width: '100%',
                                    height: '500px',
                                }}
                            >
                                <Marker
                                    coordinates={[this.state.longitudeDB, this.state.latitudeDB]}
                                    anchor="bottom">
                                    <img src={"./assets/img/marker.png"} />
                                </Marker>
                                <Layer
                                    type="symbol"
                                    layout={{ "icon-image": "marker-15" }}>
                                    <Feature
                                        coordinates={[this.state.longitudeDB, this.state.latitudeDB]}
                                        
                                    />
                                </Layer>
                            </Map>
                            

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                                </Button>

                        </Modal.Footer>
                    </Modal>


                </Container>
            </div>
        );
    }
}

export default Search;
