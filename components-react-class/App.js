/**
 * Created by topcmm on 6/16/2017.
 */
const React = require('react');
const Person = require('./Person');
//const fs = require('fs');//module brfs
//var content = fs.readFileSync(__dirname + '/Person.js', 'utf8');
const Text = require('./Text');
const SurveyList = require('./SurveyList');

module.exports = React.createClass({
    getInitialState() {
        return {
            name:"",
            age :"",
            persons:[]
        }
    },
    render() {
        const {name,age,persons} = this.state;
        console.log('App---> render');
        return (
            <div>
                <span>姓名:</span><input value={name} name="name" onChange={this._handleChange}/>
                <span>年龄:</span><input value={age} name="age" onChange={this._handleChange}/>
                <input type="button" onClick={this._handleClick} value="确认"/>
                <Text />
                <SurveyList />
                {
                    persons.map((person, index)=>(
                    <Person key={index} detail={person}/>
                    ))
                }
            </div>
        )
    },

    _handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    },

    _handleClick(){
        const {name,age} = this.state;
        this.setState({
            name:"",
            age :"",
            persons:this.state.persons.concat([{name:name,age:age}])
        })

    }
});