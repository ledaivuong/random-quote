import React from 'react';
import Button from '../Button/Button'

const Panel = (props) => {
    let {themeColor, panelColor, textColor, data, changeTheme, getQuote} = props;
    return (
        <div
            className="panel panel-default col-xs-4 col-xs-offset-4"
            style={{backgroundColor:panelColor}}
        >
            <div
                className="panel-body">
                <p className="fadeIn" id="quote-content" style={{color:textColor}}>{data.content}</p>
                <p id="quote-author" style={{float: 'right', color:textColor}}>{data.author}</p>
            </div>
           <Button
               buttonColor={themeColor}
               changeTheme={changeTheme}
               getQuote={getQuote}
           />
        </div>
    );
};

export default Panel;
