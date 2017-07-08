/**
 * Created by topcmm on 7/3/2017.
 */
import React from 'react';

export default class extends React.Component {
    render() {
        console.dir(this.props.forceUpdateRef);
        return <div onClick={this.props.onClick}>{this.props.forceUpdate + ' - '+ this.props.setProps}</div>
    }
}