import React, {Component} from "react"

export default class HeaderUnloggedIn extends Component {
    render() {
        return (
            <div>
                React Forms
                {" "}<button>sign up</button>
                {" "}<button>log in</button>
            </div>
        )
    }
}