/**
 * Created by topcmm on 6/16/2017.
 */
import React, { Component } from 'react';
import pureRender from "pure-render-decorator";
import PropTypes from 'prop-types';

@pureRender
class Person  extends Component {
    static propTypes = {
        detail: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            value: {foo: 'bar'}
        }
    }

    componentWillMount() {
        console.log('person will mount');
    }

    componentWillReceiveProps(newProps){
        console.log(`我新的props的name是${newProps.detail.name}，age是${newProps.detail.age}。我以前的props的name是${this.props.detail.name}，age是${this.props.detail.age}是我要re-render了`);
    }
    handleOnclick() {
        var value = this.state.value;
        value.foo += 'bar'; // ANTI-PATTERN!
        this.setState({ value: value });
    }

    render() {
        console.log("我re-render了");
        const {name,age} = this.props.detail;

        return (
            <div>
                <span>姓名:</span><span>{name}</span>
                <span onClick={this.handleOnclick.bind(this)}> age:</span><span>{age}</span>
                <span>{this.state.value.foo}</span>
            </div>
        )
    }
}

export default Person;