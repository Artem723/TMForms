import React from "react"
import { FormControl } from "react-bootstrap"

export default function SearchInput(props) {
    const { searchText, onChange } = props;
    return (
        <div className="search-input">
            <span className="glyphicon glyphicon-search"></span>
            <FormControl placeholder="Search..." type="text" value={searchText} onChange={onChange} />
        </div>
    )
}