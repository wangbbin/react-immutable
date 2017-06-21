/**
 * Created by topcmm on 6/21/2017.
 */
import React from 'react/addons';
import Immutable from 'immutable';
import CheckboxWithLabel from './CheckboxWithLabel'

class SurveyList extends React.Component {
    state = Immutable.fromJS({
        items: [
            {
                id: 0,
                text: "你喜欢吃萝卜吗？",
                on: "喜欢",
                off: "不喜欢",
                checked: false
            },
            {
                id: 1,
                text: "你喜欢吃西瓜吗？",
                on: "喜欢",
                off: "不喜欢",
                checked: false
            },
            {
                id: 2,
                text: "你喜欢吃香蕉吗？",
                on: "喜欢",
                off: "不喜欢",
                checked: false
            }
        ]
    });

    onChange(labelId) {
        const newState = this.state.setIn(["items", labelId, "checked"], !this.state.getIn(["items", labelId, "checked"]));
        this.replaceState(newState);
    }

    render() {
        const that = this;
        console.log('render')
        return (
            <div>
                {
                    this.state.get("items").map(function (label) {
                        return <div><CheckboxWithLabel label={label} onChange={that.onChange.bind(that)}/></div>;
                    })
                }
            </div>);
    }
}

export default SurveyList;