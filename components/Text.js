/**
 * Created by topcmm on 6/20/2017.
 */
import React, { Component } from 'react';
import _ from 'lodash';

export default class extends Component {
    state = {
        data: { times: 0}
    };

    handleAdd() {
        let data = _.cloneDeep(this.state.data);

        data.times = data.times + 1;
        this.setState({ data: data });
        // 如果上面不做 cloneDeep，下面打印的结果会是已经加 1 后的值。
        console.log(this.state.data.times);
    }

    render() {
        return (<span onClick={this.handleAdd.bind(this)}>add{this.state.data.times}</span>);
    }
}