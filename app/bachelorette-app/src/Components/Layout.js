import React, { Component } from 'react'
import {Navbar, Container, Row, Col, Form, Button} from 'react-bootstrap'
import TweetTable from './TweetTable'
import "./Layout.css"
import fetchData from "../utils/elasticsearchFetcher"

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            search_term : "",
            tweet_data : [ ]
        }
    }

    updateTweetData = (ret_data) => {
        this.setState({ tweet_data : ret_data});
    }

    updateTweetTable = () => {
        fetchData(this.state.search_term, this.updateTweetData);
    }

    updateSearchInput = (searchterm) => {
        let encoded_searchterm = encodeURIComponent(searchterm);
        this.setState({search_term: encoded_searchterm})
    }

    handleSearchInput = (e) => {
        this.updateSearchInput(e.target.value);
    }

    submitForm = (e) => {
        e.preventDefault();
        this.updateTweetTable();
    }

    exampleInput = (searchterm) => {
        return () => {
            this.updateSearchInput(searchterm);
        }
    }

    render() {
        return(
            <div className="layout">
                <Container className="layout-bootstrap-container">
                    <Row className="layout-navbar">
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand>
                            {'#BachelorNation'}
                            </Navbar.Brand>
                        </Navbar>
                    </Row>
                    <div className="layout-searchandtable">
                        <Row className="layout-searchform">
                            <Col>
                                <Form onSubmit={this.submitForm}>
                                    <Row>
                                        <Col md='auto'>
                                            <Form.Group controlId="formSearch">
                                                <Form.Control type="searchterm" placeholder="Enter search term" onChange={this.handleSearchInput}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md= 'auto'>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>
                                        <Col id='layout-examplesearchinstruct'>
                                            Try an example search:
                                        </Col>
                                        <Col md= 'auto'>
                                            <Button variant="secondary" type="submit" onClick={this.exampleInput("Hannah Brown")}>
                                                Hannah Brown
                                            </Button>
                                        </Col>
                                        <Col md= 'auto'>
                                            <Button variant="secondary" type="submit" onClick={this.exampleInput("John Paul Jones")}>
                                                John Paul Jones
                                            </Button>
                                        </Col>
                                        <Col md= 'auto'>
                                            <Button variant="secondary" type="submit" onClick={this.exampleInput("#BachelorInParadise")}>
                                                #BachelorInParadise
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row className="layout-tweettable">
                            <Col >
                                <TweetTable
                                    data = {this.state.tweet_data}
                                /> 
                            </Col>

                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Layout