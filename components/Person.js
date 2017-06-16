/**
 * Created by topcmm on 6/16/2017.
 */
import React, { Component } from 'react';
import pureRender from "pure-render-decorator";

@pureRender
class Person  extends Component {
    componentWillMount() {
        console.log('person will mount');
    }

    componentWillReceiveProps(newProps){
        console.log(`我新的props的name是${newProps.name}，age是${newProps.age}。我以前的props的name是${this.props.name}，age是${this.props.age}是我要re-render了`);
    }
    render() {
        console.log("我re-render了");
        const {name,age} = this.props;

        return (
            <div>
                <span>姓名:</span><span>{name}</span>
                <span> age:</span><span>{age}</span>
            </div>
        )
    }
}

export default Person;