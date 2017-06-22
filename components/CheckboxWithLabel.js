import React from 'react';
import pureRender from "pure-render-decorator";

@pureRender
class CheckboxWithLabel extends React.Component{

/*    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.label !== this.props.label;
    }*/

    componentWillMount() {
        console.log('Label--> will mount');
    }

    componentWillReceiveProps (nextProps) {
        console.log(`Label-->Receive newProps${nextProps.label.get('text')}`);
    }

    componentWillUpdate() {
        console.log('Label--> will update');
    }

    componentDidMount() {
        console.log('Label--> did mount');
    }

    componentDidUpdate() {
        console.log('Label--> did update');
    }

    componentWillUnmount() {
        console.log('Label--> will Unmount');
    }

    onChange() {
        this.props.onChange(this.props.label.get("id"));
    }

    render() {
        console.log('Label--> render' + this.props.label.get("text"));
        return (
            <label>
                {this.props.label.get("text")}
                <input type = "checkbox" checked={this.props.label.get("checked")} onChange={this.onChange.bind(this)}/>
                {this.props.label.get("checked") ? this.props.label.get("on") : this.props.label.get("off")}
            </label>);
    }
}

export default CheckboxWithLabel;