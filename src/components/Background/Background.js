import React, {Component} from 'react';
import Panel from '../Panel/Panel'

class Background extends Component {
    render() {
        let {themeColor, panelColor, textColor} = this.props.theme;
        let {changeTheme, getQuote, data} = this.props;
        return (
            <div
                className="container-fluid background"
                style={
                    {
                        minHeight: '100%',
                        backgroundColor:themeColor
                    }
                }
            >
                <Panel
                    themeColor={themeColor}
                    panelColor={panelColor}
                    textColor={textColor}
                    changeTheme={changeTheme}
                    getQuote={getQuote}
                    data={data}
                />
                <div className="footer text-center">
                    <div className="row">
                        <hr className="col-xs-8 col-xs-offset-2 "/>
                    </div>
                    <div className="row">
                        <div className="col-xs-8 col-xs-offset-2" style={{float: 'right'}}><p
                            style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>Code by
                            ledaivuong1990@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Background;