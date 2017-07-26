/**
 * Created by topcmm on 7/11/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
/*
export default function MyFunctionalComponent() {

    return <input />;
}*/

export default function CustomTextInput(props, context) {
    // 这里必须声明 textInput，这样 ref 回调才可以引用它
    console.log('  myFunctional render');
    let textInput = null;

    function handleClick() {
        textInput.focus();
    }

    return (
        <div>
            <input
                type="text"
                ref={(input) => { textInput = input;console.log('  myFunctional refs-->', input) }} />
            <input
                type="button"
                value="Focus the text input"
                onClick={handleClick}
            />
            {context.cText && context.cText || null}
        </div>
    );
};

CustomTextInput.contextTypes = { cText: PropTypes.string};
