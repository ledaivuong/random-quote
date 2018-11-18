import React, {Component} from 'react';
import './App.css';
import Background from './components/Background/Background';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function loadQuote() {
    $('#quote-content, #quote-author').fadeOut();
    $('button').css("color", "white");
    $.ajax({
        dataType: "jsonp",
        jsonp: "jsonp",
        cache: false,
        url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
        success: setQuote
    });

    function setQuote(data) {
        let color = getRandomTheme();
        $('.container-fluid, button').animate({
            backgroundColor: color.background
        }, 1000);

        $('.panel').animate({
            backgroundColor: color.panel,
            color: color.text
        }, 1000);

        let content = data.quoteText.trim();
        let author = data.quoteAuthor ? data.quoteAuthor.trim() : "Unknown";

        $('#quote-content').text('"' + content + '"');
        $('#quote-author').text("- " + author + " -");
        $('#quote-author, #quote-content').fadeIn(1000);
    }
}

function getRandomTheme() {
    const colors = [
        new Theme('#FF9191', '#FFD4D4', '#B63232'),
        new Theme('#FFC391', '#FFEBDA', '#B66E32'),
        new Theme('#7EDD7E', '#CEF1CE', '#289128'),
        new Theme('#FFDA91', '#FFF3DA', '#B68A32'),
        new Theme('#579999', '#C2E3E3', '#1E6D6D'),
        new Theme('#74CC74', '#C2E3E3', '#1E6D6D')
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function Theme(themeColor, panelColor, textColor) {
    this.themeColor = themeColor;
    this.panelColor = panelColor;
    this.textColor = textColor;
}

// $(function init() {
//     loadQuote();
//     $('.btn-quote').on('click', loadQuote);
// });

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: {
                themeColor: '#FF9191',
                panelColor: '#FFD4D4',
                textColor: '#B63232'
            },
            data: {
                content: "",
                author: ""
            }
        };
        this.changeTheme = this.changeTheme.bind(this);
        this.getQuote = this.getQuote.bind(this);
    };

    changeTheme() {
        let newTheme = getRandomTheme();
        this.setState({
            theme: {
                themeColor: newTheme.themeColor,
                panelColor: newTheme.panelColor,
                textColor: newTheme.textColor
            }
        });
    };

    getQuote() {
        $.ajax({
            dataType: "jsonp",
            jsonp: "jsonp",
            cache: false,
            url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
            success: data => {
                this.setQuote(data)
            }
        });
    }

    setQuote(data) {
        let content = data.quoteText.trim();
        let author = data.quoteAuthor ? data.quoteAuthor.trim() : "Unknown";
        this.setState({
            data: {
                content: content,
                author: author
            }
        });
    }

    render() {
        return (
                <Background
                    theme={this.state.theme}
                    data={this.state.data}
                    changeTheme={this.changeTheme}
                    getQuote={this.getQuote}
                />
        );
    }
}

export default App;
