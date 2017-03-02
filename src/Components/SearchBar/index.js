import React, { Component } from "react"
import "./SearchBar.css"

export default class SearchBar extends Component {
    render() {
        const {searchText, onChange} = this.props;
        return (
            <div className="SearchBar" >
                Dashboard
            {" "}<input type="text" value={searchText} onChange={onChange}/>
            {/*{" "}<button>Ok</button>*/}
            {" "}<button>NEW</button>
            </div>
        )
    }
}