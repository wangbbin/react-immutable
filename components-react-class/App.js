/**
 * Created by topcmm on 6/16/2017.
 */
const React = require('react');
const Person = require('./Person');
//const fs = require('fs');//module brfs
//var content = fs.readFileSync(__dirname + '/Person.js', 'utf8');
const Text = require('./Text');
const SurveyList = require('./SurveyList');
const ForceUpdateAndSetProps = require('./ForceUpdateAndSetProps');
const MyFunctional = require('./stateless/myFunctional');

module.exports = React.createClass({
    getInitialState() {
        return {
            name: "",
            age: "",
            persons: []
        }
    },
    getDefaultProps() {
        return {
            level: ''
        }
    },
    ForceUpdateOrSetProps: {
        testForceUpdate: 'testForceUpdate',
        testSetProps: 'testSetProps'
    },
    componentWillMount() {
        console.log(this.props.level + 'APP--> will mount');
    },
    componentWillReceiveProps (nextProps) {
        console.log(this.props.level + `APP--> Receive newProps`);
    },
    componentWillUpdate() {
        console.log(this.props.level + 'APP--> will update');
    },
    componentDidMount() {
        console.log(this.props.level + 'APP--> did mount');
    },
    componentDidUpdate() {
        console.log(this.props.level + 'APP--> did update');
    },
    componentWillUnmount() {
        console.log(this.props.level + 'APP--> will Unmount');
    },
    handleTextRef(text) {
        this.text = text;
        console.log(this.props.level + 'APP--> text refs-->', text);
    },
    render() {
        const {name, age, persons} = this.state;
        console.log(this.props.level + 'App---> render');
        return (
            <div>
                <span>姓名:</span><input value={name} name="name" onChange={this._handleChange}/>
                <span>年龄:</span><input value={age} name="age" onChange={this._handleChange}/>
                <input type="button" onClick={this._handleClick} value="确认"/>
                {/*<Text ref={(text)=> {this.text = text; console.log(this.props.level + 'text refs-->', text)}}/>*/}
                <Text ref={this.handleTextRef}>
                    <span ref="span">children</span>
                </Text>
                <SurveyList />
                <ForceUpdateAndSetProps
                    ref="ForceUpdateOrSetProps"
                    forceUpdate={this.ForceUpdateOrSetProps.testForceUpdate}
                    forceUpdateRef={this.ForceUpdateOrSetProps}
                    setProps={this.ForceUpdateOrSetProps.testSetProps}
                    onClick={this._handleTestForceUpdateOrSetProps}
                />
                {/*你不能在函数式组件上使用 ref 属性，因为它们没有实例：
                 但是，你可以在函数式组件内部使用 ref，只要它指向一个 DOM 元素或者 class 组件：
                 */}
                <MyFunctional ref={(input) => this.input = input}/>
                {
                    persons.map((person, index) => (
                        <Person key={index} detail={person}/>
                    ))
                }
            </div>
        )
    },
    _handleTestForceUpdateOrSetProps() {
        /*this.ForceUpdateOrSetProps.testForceUpdate = 'newText';
         this.refs['ForceUpdateOrSetProps'].forceUpdate();
         */
        this.ForceUpdateOrSetProps.testSetProps = 'newText';
        this.refs['ForceUpdateOrSetProps'].setProps({testSetProps: 'abc'});
    },
    _handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    },
    _handleClick(){
        const {name, age} = this.state;
        this.setState({
            name: "",
            age: "",
            persons: this.state.persons.concat([{name: name, age: age}])
        })

    }
});