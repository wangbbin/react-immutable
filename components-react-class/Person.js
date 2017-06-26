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
    /*getDefaultProps() {
        return null;
    },*/
    getInitialState() {
        return {
            value: {foo:{foo: 'bar'}}
        };
    },
    componentWillMount() {
        console.log('person will mount');
    },
    componentWillReceiveProps(newProps){
        console.log(`我新的props的name是${newProps.detail.name}，age是${newProps.detail.age}。我以前的props的name是${this.props.detail.name}，age是${this.props.detail.age}是我要re-render了`);
    },
    handleOnclick() {
        var value = this.state.value;
        this.setState({ value: update(value, {foo: {foo: {$set: value.foo.foo + 'bar'}}}) });
    },
    render() {
        console.log("我re-render了");
        const {name,age} = this.props.detail;
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