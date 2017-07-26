/**
 * Created by topcmm on 7/26/2017.
 */
const React = require('react');

const SpanText = React.createClass({
    getDefaultProps(){
        return {
            level: '      '
        };
    },
    componentWillMount() {
        console.log(this.props.level + 'SpanText--> will mount');
    },

    componentWillReceiveProps (nextProps) {
        console.log(this.props.level + `SpanText--> Receive newProps`);
    },

    componentWillUpdate() {
        console.log(this.props.level + 'SpanText--> will update');
    },

    componentDidMount() {
        console.log(this.props.level + 'SpanText--> did mount');
    },

    componentDidUpdate() {
        console.log(this.props.level + 'SpanText--> did update');
    },

    componentWillUnmount() {
        console.log(this.props.level + 'SpanText--> will Unmount');
    },

    render() {
        console.log(this.props.level + 'SpanText--> render');
        return (<span>SpanText</span>);
    }
});

module.exports = SpanText;