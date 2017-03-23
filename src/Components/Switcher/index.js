import React from "react"
import "./Switcher.css"

export default function Switcher(props) {
    const { checked, text, onChange, ...rest } = props
    const containerClassName = checked ?"switch-container " : "switch-container checked";
    return (
        <label className={containerClassName} {...rest}>
            <div className="switch" >
                <input type="checkbox" checked={checked} onChange={onChange}/>
                <div className="slider round"></div>
            </div>
            {text && <div className="text">{text}</div>}
        </label>
    )
}

Switcher.propTypes = {
    checked: React.PropTypes.bool,
    text: React.PropTypes.string,
    onChange: React.PropTypes.func
}