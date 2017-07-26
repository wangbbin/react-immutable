/**
 * Created by topcmm on 7/3/2017.
 */
import React from 'react';

export default class extends React.Component {
    static defaultProps = {
        level: '  '
    };
    componentWillMount() {
        console.log(this.props.level + 'Force--> will mount');
    }

    componentWillReceiveProps (nextProps) {
        console.log(this.props.level + `Force--> Receive newProps`);
    }

    componentWillUpdate() {
        console.log(this.props.level + 'Force--> will update');
    }

    componentDidMount() {
        console.log(this.props.level + 'Force--> did mount');
    }

    componentDidUpdate() {
        console.log(this.props.level + 'Force--> did update');
    }

    componentWillUnmount() {
        console.log(this.props.level + 'Force--> will Unmount');
    }
    render() {
        console.log(this.props.level + 'Force render');
        return <div ref="innerRef" onClick={this.props.onClick}>{this.props.forceUpdate + ' - '+ this.props.setProps}</div>
    }
}