import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import "./SearchBar.css"

export default class SearchBar extends Component {
    render() {
        const { searchText, onChange, onNewFormHandler } = this.props;
        return (
            <header className="SearchBar" >
                <Row>
                    <Col sm={4}>Dashboard</Col>
                    <Col sm={4}><input type="text" value={searchText} onChange={onChange} /></Col>
                    <Col sm={4}><button onClick={onNewFormHandler}>NEW</button></Col>
                </Row>
            </header>
        )
    }
}