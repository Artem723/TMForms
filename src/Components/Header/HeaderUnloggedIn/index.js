import React, {Component} from "react"
import "../header.css"

export default class HeaderUnloggedIn extends Component {
    render() {
        return (
            <div className="header">
                React Forms
                {" "}<button>sign up</button>
                {" "}<button>log in</button>
                <hr />
            </div>
        )
    }
}