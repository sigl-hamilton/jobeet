import React, { Component } from 'react'

// Generic component made to create a simple button
class ButtonSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        let cols = this.props.cols ? this.props.cols : "12";
        let onClick = this.props.onClick ? this.props.onClick : null;
        let id = this.props.id ? this.props.id : null;
        let text = this.props.text ? this.props.text : "";
        return (
            <div className={"input-field col s" + cols.toString()} style={{ paddingLeft: "11.250px" }}>
                <button
                    id={id}
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    onClick={onClick}
                >
                    {text}
                </button>
            </div>
        )
    }
}

export default ButtonSubmit
