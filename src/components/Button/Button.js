import React, {Component} from 'react';

let FX = {
    easing: {
        linear: function(progress) {
            return progress;
        },
        quadratic: function(progress) {
            return Math.pow(progress, 2);
        },
        swing: function(progress) {
            return 0.5 - Math.cos(progress * Math.PI) / 2;
        },
        circ: function(progress) {
            return 1 - Math.sin(Math.acos(progress));
        },
        back: function(progress, x) {
            return Math.pow(progress, 2) * ((x + 1) * progress - x);
        },
        bounce: function(progress) {
            for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (progress >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                }
            }
        },
        elastic: function(progress, x) {
            return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
        }
    },
    animate: function(options) {
        let start = new Date();
        let id = setInterval(function() {
            let timePassed = new Date() - start;
            let progress = timePassed / options.duration;
            if (progress > 1) {
                progress = 1;
            }
            options.progress = progress;
            let delta = options.delta(progress);
            options.step(delta);
            if (progress == 1) {
                clearInterval(id);
                options.complete();
            }
        }, options.delay || 10);
    },
    fadeIn: function(element, options) {
        let to = 0;
        this.animate({
            duration: options.duration,
            delta: function(progress) {
                progress = this.progress;
                return FX.easing.swing(progress);
            },
            complete: options.complete,
            step: function(delta) {
                element.style.opacity = to + delta;
            }
        });
    }
};

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.getQuote();
        this.props.changeTheme();
        let buttonGetQuote = document.getElementById('buttonGetQuote');
        buttonGetQuote.style.visibility = 'hidden';
        FX.fadeIn(document.getElementById('quote-content'), {
            duration: 2000,
            complete: function(){
                buttonGetQuote.style.visibility = 'visible';
            }
        });
        FX.fadeIn(document.getElementById('quote-author'), {
            duration: 2000,
            complete: function(){}
        });
    }

    render() {
        let {buttonColor} = this.props;
        return (
            <div className="row">
                <button
                    id="buttonGetQuote"
                    className="btn btn-quote background"
                    style={
                        {
                            float: 'right',
                            marginRight: '2%',
                            marginBottom: '2%',
                            background: buttonColor,
                            color: 'white'
                        }
                    }
                    onClick={this.handleOnClick}
                >Get quote
                </button>
            </div>
        );
    }
}

export default Button;