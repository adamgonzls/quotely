import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [randomQuoteObj, setRandomQuoteObj] = useState({
    author: 'Gail Sheehy',
    id: null,
    profession: '',
    quote: 'Growth demands a temporary surrender of security',
  })
  const [allQuotesData, setAllQuotesData] = useState([])
  const [backgroundImage, setBackgroundImage] = useState('')

  console.log(randomQuoteObj)

  useEffect(() => {
    fetch(`https://adams-quote-api-v1.herokuapp.com/quotes`)
      .then((res) => res.json())
      .then((data) => setAllQuotesData(data))
  }, [])

  // set up useEffect for backgroundImage (unsplash API)

  function getRandomQuote() {
    const randomQuoteData =
      allQuotesData[Math.floor(Math.random() * allQuotesData.length)]
    setRandomQuoteObj(randomQuoteData)
  }

  return (
    <div className='App'>
      <header>
        <button onClick={getRandomQuote}>Random Quote</button>
      </header>
      <main>
        <div className='quoteContainer'>
          <h1>{randomQuoteObj.quote}</h1>
          <p>-{randomQuoteObj.author}</p>
          {randomQuoteObj.profession && <p>{randomQuoteObj.profession}</p>}
        </div>
      </main>
    </div>
  )
}

export default App
