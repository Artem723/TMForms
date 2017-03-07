import React, {Component} from "react"
import "../header.css"

export default class HeaderUnloggedIn extends Component {
    render() {
        const {onGoToLogInHandler, onGoToSignUpHandler} = this.props;
        return (
            <div className="header">
                React Forms
                {" "}<button onClick={onGoToSignUpHandler}>sign up</button>
                {" "}<button onClick={onGoToLogInHandler}>log in</button>
                <hr />
            </div>
        )
    }
}