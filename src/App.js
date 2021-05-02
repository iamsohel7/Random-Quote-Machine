import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

//API providing an array-object of quotes and  author's name 
const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //Initialization of the Default state of quotes and index
      quotes: [
        {
          quote: "Life isn’t about getting and having, it’s about giving and being.",
          author: "Kevin"
        }
      ],

      index: 0
    };

  }

  //Setting the background-color of body 
  componentWillMount() {
    document.body.style.backgroundColor = "#3a8fe9";
  }

  //Fetching data from the API
  componentDidMount() {
    fetch(API).then(res => res.json())
      .then(res => {
        this.setState({
          quotes: res.quotes
        }, this.getRandomIndex);       /*Calling the function to get a random index 
                                       from the array of fetched data*/
      })
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    /*Assigning index a random value between 1 to 
      the length of the array fetched*/
    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      });
    }
  }


  render() {
    const { quotes, index } = this.state;  //Assigning the current state values
    const quote = quotes[index];

    //URL of twitter to post the quote
    const tweetURL = `http://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`

    return (
      <div className="row d-flex justify-content-center align-items-center wrapper">
        <div className="col-4 box p-5 rounded" id="quote-box">
          {
            quote &&
            <div className="mb-4">
              <h5 id="text"><FontAwesomeIcon icon={faQuoteLeft} className="fa-2x" id="quoteLeft" />{quote.quote}</h5>
              <cite className="d-block text-right" id="author">- {quote.author}</cite>
            </div>
          }

          <div className="d-flex justify-content-between">
            <div>
              <a id="tweet-quote" target="_blank" href={tweetURL} className="btn btn-primary "><FontAwesomeIcon icon={faTwitterSquare} /></a>
              <a id="facebook-post" target="_blank" href={"https://www.facebook.com/"} className="btn btn-primary ml-1" ><FontAwesomeIcon icon={faFacebook} /></a>
            </div>

            <button id="new-quote" className="btn btn-primary btn-sm" onClick={this.getRandomIndex}>New Quote</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
