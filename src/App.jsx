import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import logo from './logo.svg'
import './App.css'

function App() {
  const [randomQuoteObj, setRandomQuoteObj] = useState({
    author: 'Gail Sheehy',
    id: null,
    profession: '',
    quote: 'Growth demands a temporary surrender of security',
    backgroundImageURL: 'https://images.unsplash.com/photo-1546448396-6aef801',
  })
  const [allQuotesData, setAllQuotesData] = useState([])
  // const [randomBackgroundImage, setRandomBackgroundImage] = useState(
  // 'https://images.unsplash.com/photo-1546448396-6aef801'
  // )

  // console.log(randomBackgroundImage)

  useEffect(() => {
    fetch(`https://adams-quote-api-v1.herokuapp.com/quotes`)
      .then((res) => res.json())
      .then((data) => setAllQuotesData(data))
  }, [])

  useEffect(() => {
    // getRandomUnsplashImage()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // getRandomUnsplashImage()
      console.log('called')
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  function getRandomUnsplashImage() {
    fetch(
      `https://api.unsplash.com/photos/random/?client_id=RyjdpW1hxq8mSR8fAHEE8pUNx38fSXjgdnd0UeBCVu4&query=abstract&count=1`
    )
      .then((res) => res.json())
      .then((data) =>
        setRandomQuoteObj((prevData) => {
          return {
            ...prevData,
            backgroundImageURL: data[0].urls.regular,
          }
        })
      )
  }

  function handleGetRandomQuote() {
    const randomQuoteData =
      allQuotesData[Math.floor(Math.random() * allQuotesData.length)]
    setRandomQuoteObj((prevData) => {
      return {
        ...prevData,
        author,
        id,
        profession,
        quote,
      }
    })
  }

  return (
    <div className='App'>
      <Header handleGetRandomQuote={handleGetRandomQuote} />
      <main
        style={{
          backgroundImage: `url(${randomQuoteObj.backgroundImageURL})`,
        }}
      >
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
