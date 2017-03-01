import React, { Component } from "react"
import "./SearchBar.css"

export default class SearchBar extends Component {
    render() {
        return (
            <div className="SearchBar">
                Dashboard
            {" "}<input type="text"/>
            {" "}<button>Ok</button>
            {" "}<button>NEW</button>
            </div>
        )
    }
}