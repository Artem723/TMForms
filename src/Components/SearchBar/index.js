import React, { Component } from "react"
import { Row, Col, Button } from "react-bootstrap"
import SearchInput from "./SearchInput"
import "./SearchBar.css"

export default class SearchBar extends Component {
    render() {
        const { searchText, onChange, onNewFormHandler } = this.props;
        return (
            <header className="SearchBar" >
                <Row>
                    <Col sm={4}><span className="title">Dashboard</span></Col>
                    <Col sm={4}>
                        <SearchInput searchText={searchText} onChange={onChange}/>
                    </Col>
                    <Col sm={2} smOffset={1}><Button className="new-btn" bsStyle="primary" onClick={onNewFormHandler} block>NEW</Button></Col>
                </Row>
            </header>
        )
    }
}