/**
 * Created by topcmm on 6/16/2017.
 */
import React, { Component } from 'react';
import Person from './Person';
//const fs = require('fs');
//var content = fs.readFileSync(__dirname + '/Person.js', 'utf8');
import Text from './Text';
import SurveyList from './SurveyList';
import ForceUpdateAndSetProps from './ForceUpdateAndSetProps';

export default class extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            age :"",
            persons:[]
        }
    }
    ForceUpdateOrSetProps = {
        testForceUpdate: 'testForceUpdate',
        testSetProps: 'testSetProps'
    };
    render() {
        const {name,age,persons} = this.state;
        console.log('App---> render');
        return (
            <div>
                <span>姓名:</span><input value={name} name="name" onChange={this._handleChange.bind(this)}/>
                <span>年龄:</span><input value={age} name="age" onChange={this._handleChange.bind(this)}/>
                <input type="button" onClick={this._handleClick.bind(this)} value="确认"/>
                <Text />
                <SurveyList />
                <ForceUpdateAndSetProps
                    ref="ForceUpdateOrSetProps"
                    forceUpdate={this.ForceUpdateOrSetProps.testForceUpdate}
                    forceUpdateRef={this.ForceUpdateOrSetProps}
                    setProps={this.ForceUpdateOrSetProps.testSetProps}
                    onClick={this._handleTestForceUpdateOrSetProps.bind(this)}
                />
                {
                    persons.map((person, index)=>(
                    <Person key={index} detail={person}/>
                    ))
                }
            </div>
        )
    }
    _handleTestForceUpdateOrSetProps() {
        /*this.ForceUpdateOrSetProps.testForceUpdate = 'newText';
        this.refs['ForceUpdateOrSetProps'].forceUpdate();
*/
        this.ForceUpdateOrSetProps.testSetProps = 'newText';
        this.refs['ForceUpdateOrSetProps'].setProps({testSetProps: 'abc'});
    }
    _handleChange(event){
        this.setState({[event.target.name]:event.target.value});
    }
    _handleClick(){
        const {name,age} = this.state;
        this.setState({
            name:"",
            age :"",
            persons:this.state.persons.concat([{name:name,age:age}])
        })

    }
}