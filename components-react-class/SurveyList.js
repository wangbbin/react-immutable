/**
 * Created by topcmm on 6/21/2017.
 */
const React = require('react');
const Immutable = require('immutable');
const CheckboxWithLabel = require('./CheckboxWithLabel');
const pureRender = require('react-addons-pure-render-mixin');

const SurveyList = React.createClass({
    mixins: [pureRender],
    getInitialState() {
        return {
            data: Immutable.fromJS({
                items: [
                    {
                        id: 0,
                        text: "超信？",
                        on: "喜欢",
                        off: "不喜欢",
                        checked: false
                    },
                    {
                        id: 1,
                        text: "蒲公英？",
                        on: "喜欢",
                        off: "不喜欢",
                        checked: false
                    },
                    {
                        id: 2,
                        text: "聊聊？",
                        on: "喜欢",
                        off: "不喜欢",
                        checked: false
                    }
                ]
            })
        };
    },
    componentWillMount() {
        console.log('Survey-->will mount');
    },
    onChange(labelId) {
        const newState = this.state.data.setIn(["items", labelId, "checked"], !this.state.data.getIn(["items", labelId, "checked"]));
        this.setState({data: newState});
    },
    componentWillReceiveProps (newProps) {
        console.log('Survey-->will receive');
    },
    componentWillUpdate() {
        console.log('Survey--> will update');
    },
    componentDidMount() {
        console.log('Survey--> did mount');
    },
    componentDidUpdate() {
        console.log('Survey--> did update');
    },
    componentWillUnmount() {
        console.log('Survey--> will Unmount');
    },
    render() {
        const that = this;
        console.log('Survey-->render');
        return (
            <div>
                {
                    this.state.data.get("items").map(function (label, index) {
                        return <div key={index}><CheckboxWithLabel label={label} onChange={that.onChange}/></div>;
                    })
                }
            </div>);
    }
});

module.exports = SurveyList;