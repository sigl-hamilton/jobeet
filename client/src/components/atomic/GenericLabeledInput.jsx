import React, { Component } from 'react'

class GenericLabeledInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    render() {
        let cols = this.props.cols ? this.props.cols : "12";
        let onChange = this.props.onChange ? this.props.onChange : null;
        let value = this.props.value ? this.props.value : "";
        let error = this.props.error ? this.props.error : "";
        let id = this.props.id;
        let type = this.props.type ? this.props.type : null;
        let label = this.props.label ? this.props.label : "";
        return (
            <div className="input-field">
                <input
                    onChange={onChange}
                    value={value}
                    error={error}
                    id={id}
                    type={type}
                />
                <label className="ml-2" htmlFor={id}>{label}</label>
            </div>
        )
    }
}

export default GenericLabeledInput
