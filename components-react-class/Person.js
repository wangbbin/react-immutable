/**
 * Created by topcmm on 6/16/2017.
 */
const React = require('react');
const pureRender = require('react-addons-pure-render-mixin');
const PropTypes = require('prop-types');
const update = require('react-addons-update');

const Person = React.createClass({
    mixins: [pureRender],
    propsTypes: {
        detail: PropTypes.object.isRequired
    },
    getDefaultProps() {
        return {
            level: '  '
        };
    },
    getInitialState() {
        return {
            value: {foo: {foo: 'bar'}}
        };
    },

    componentWillMount() {
        console.log(this.props.level + 'person--> will mount');
    },

    componentWillReceiveProps(newProps){
        console.log(this.props.level + `我新的props的name是${newProps.detail.name}，age是${newProps.detail.age}。我以前的props的name是${this.props.detail.name}，age是${this.props.detail.age}是我要re-render了`);
    },

    componentWillUpdate() {
        console.log(this.props.level + 'person--> will update');
    },

    componentDidMount() {
        console.log(this.props.level + 'person--> did mount');
    },

    componentDidUpdate() {
        console.log(this.props.level + 'person--> did update');
    },

    componentWillUnmount() {
        console.log(this.props.level + 'person--> will Unmount');
    },
    handleOnclick() {
        var value = this.state.value;
        this.setState({value: update(value, {foo: {foo: {$set: value.foo.foo + 'bar'}}})});
    },

    render() {
        console.log(this.props.level + "我re-render了");
        const {name, age} = this.props.detail;

        return (
            <div>
                <span>姓名:</span><span>{name}</span>
                <span onClick={this.handleOnclick}> age:</span><span>{age}</span>
                <span>{this.state.value.foo.foo}</span>
            </div>
        )
    }
});

/*InputControlES6.propTypes = {
    initialValue: React.PropTypes.string
};
InputControlES6.defaultProps = {
    initialValue: ''
};*/

module.exports = Person;