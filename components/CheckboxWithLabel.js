import React from 'react';
import pureRender from "pure-render-decorator";
import SpanText from "./SpanText";

@pureRender
class CheckboxWithLabel extends React.Component{

/*    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.label !== this.props.label;
    }*/
    static defaultProps = {
        level: '    '
    };
    componentWillMount() {
        console.log(this.props.level + 'Label--> will mount');
    }

    componentWillReceiveProps (nextProps) {
        console.log(this.props.level + `Label--> Receive newProps${nextProps.label.get('text')}`);
    }

    componentWillUpdate() {
        console.log(this.props.level + 'Label--> will update');
    }

    componentDidMount() {
        console.log(this.props.level + 'Label--> did mount');
    }

    componentDidUpdate() {
        console.log(this.props.level + 'Label--> did update');
    }

    componentWillUnmount() {
        console.log(this.props.level + 'Label--> will Unmount');
    }

    onChange() {
        this.props.onChange(this.props.label.get("id"));
    }

    render() {
        console.log(this.props.level + 'Label--> render' + this.props.label.get("text"));
        return (
            <label>
                {this.props.label.get("text")}
                <input type = "checkbox" checked={this.props.label.get("checked")} onChange={this.onChange.bind(this)}/>
                {this.props.label.get("checked") ? this.props.label.get("on") : this.props.label.get("off")}
                <SpanText />
            </label>);
    }
}

export default CheckboxWithLabel;