import React, { Component } from 'react'
import GenericLabeledInput from "./GenericLabeledInput";

// A component to make a labeled email input
class LabeledInputEmail12 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let onChange = this.props.onChange ? this.props.onChange : null;
        let value = this.props.value ? this.props.value : "";
        let error = this.props.error ? this.props.error : "";
        let id = this.props.id;
        let label = this.props.label ? this.props.label : "";
        return (
            <GenericLabeledInput className={this.props.className}
                cols="12"
                onChange={onChange}
                value={value}
                error={error}
                id={id}
                label={label}
                type={"email"}
            />
        )
    }
}

export default LabeledInputEmail12
