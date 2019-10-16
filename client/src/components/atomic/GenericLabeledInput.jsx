import React, { Component } from 'react'

// Generic component made to create a labeled input (for example, a first name input or a password input)
// LabeledInputNormal12, LabeledInputEmail12 and LabeledInputPassword12 are based on it
class GenericLabeledInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        let onChange = this.props.onChange ? this.props.onChange : null;
        let value = this.props.value ? this.props.value : "";
        let error = this.props.error ? this.props.error : "";
        let id = this.props.id;
        let type = this.props.type ? this.props.type : null;
        let label = this.props.label ? this.props.label : "";
        return (
            <div className="input-field row">
                <label className="ml-2 col-12" htmlFor={id}>{label}</label>
                <input className="col-12"
                    onChange={onChange}
                    value={value}
                    error={error}
                    id={id}
                    type={type}
                />
            </div>
        )
    }
}

export default GenericLabeledInput
