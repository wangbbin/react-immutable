/**
 * Created by topcmm on 6/20/2017.
 */
const React = require('react');
const { Map } = require('immutable');
//const _ = require('lodash');

module.exports = React.createClass({
    getInitialState() {
        return {
            data: Map({ times: 0 })
        };
    },
    handleAdd() {
        /*//let data = _.cloneDeep(this.state.data);
        let data = this.state.data;
        data.times = data.times + 1;
        this.setState({ data: data });
        // 如果上面不做 cloneDeep，下面打印的结果会是已经加 1 后的值。
        console.log(this.state.data.times);*/

        this.setState({ data: this.state.data.update('times', v => v + 1) });
        // 这时的 times 并不会改变
        console.log(this.state.data.get('times'));
    },
    render() {
        console.log('Text---> render');
        return (<span onClick={this.handleAdd}>add{this.state.data.get('times')}</span>);
    }
});