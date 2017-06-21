import React from 'react';

class CheckboxWithLabel extends React.Component{

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.label !== this.props.label;
    }

    onChange() {
        this.props.onChange(this.props.label.get("id"));
    }

    render() {
        return (
            <label>
                {this.props.label.get("text")}
                <input type = "checkbox" checked={this.props.label.get("checked")} onChange={this.onChange}/>
                {this.props.label.get("checked") ? this.props.label.get("on") : this.props.label.get("off")}
            </label>);
    }
}

export default CheckboxWithLabel;