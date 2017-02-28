import React, {Component} from "react"

export default class FormTile extends Component {
    render() {
        let {title} = this.props;
        return (
            <div>
                <hr />
                Title: {title}{"\n"}
                <button>delete</button>
            </div>
        )
    }
}

FormTile.propTypes = {
    title: React.PropTypes.string.isRequired,
}