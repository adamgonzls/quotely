import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  const DEFAULT_TIMER = 15
  const [randomQuoteData, setRandomQuoteData] = useState({
    author: 'Gail Sheehy',
    id: null,
    profession: '',
    quote: 'Growth demands a temporary surrender of security',
    backgroundImageURL:
      'https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDU3MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTk4NDM1ODg&ixlib=rb-1.2.1&q=80&w=1080',
  })
  const [allQuotesDataFromAPI, setAllQuotesDataFromAPI] = useState([])
  const [imagesData, setImagesData] = useState(
    JSON.parse(localStorage.getItem('imagesData')) || null
  )
  const [remainingTime, setRemainingTime] = useState(DEFAULT_TIMER)

  useEffect(() => {
    async function getQuotesFromAPI() {
      const res = await fetch(`https://adams-quote-api-v1.herokuapp.com/quotes`)
      const data = await res.json()
      setAllQuotesDataFromAPI(data)
    }
    getQuotesFromAPI()
  }, [])

  useEffect(() => {
    if (!imagesData) {
      console.log('calling images API')
      async function getImagesFromAPI() {
        const res = await fetch(
          `https://api.unsplash.com/photos/random/?client_id=RyjdpW1hxq8mSR8fAHEE8pUNx38fSXjgdnd0UeBCVu4&query=abstract&count=30`
        )
        const data = await res.json()
        setImagesData(data)
      }
      getImagesFromAPI()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('imagesData', JSON.stringify(imagesData))
  }, [imagesData])

  useEffect(() => {
    if (!imagesData) {
      return
    }

    if (remainingTime === 0) {
      handleGetRandomImage()
      handleGetRandomQuote()
    }

    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        console.log(remainingTime)
        setRemainingTime((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [imagesData, remainingTime])

  function handleGetRandomQuote() {
    const randomQuoteData =
      allQuotesDataFromAPI[
        Math.floor(Math.random() * allQuotesDataFromAPI.length)
      ]

    setRandomQuoteData((prevData) => {
      return {
        ...prevData,
        author: randomQuoteData.author ? randomQuoteData.author : '',
        id: randomQuoteData.id,
        profession: randomQuoteData.profession
          ? randomQuoteData.profession
          : '',
        quote: randomQuoteData.quote,
      }
    })
    setRemainingTime(DEFAULT_TIMER)
  }

  function handleGetRandomImage() {
    const randomImage =
      imagesData[Math.floor(Math.random() * imagesData.length)]
    const randomImageURL = randomImage.urls.regular
    setRandomQuoteData((prevData) => {
      return {
        ...prevData,
        backgroundImageURL: randomImageURL,
      }
    })
    setRemainingTime(DEFAULT_TIMER)
  }

  return (
    <div className='App'>
      <Header
        handleGetRandomQuote={handleGetRandomQuote}
        handleGetRandomImage={handleGetRandomImage}
      />
      <main
        style={{
          backgroundImage: `url(${randomQuoteData.backgroundImageURL})`,
        }}
      >
        <div className='quoteContainer'>
          <h1 className='quote'>{randomQuoteData.quote}</h1>
          {randomQuoteData.author && (
            <p className='quoteAuthor'>{randomQuoteData.author}</p>
          )}
          {randomQuoteData.profession && (
            <p className='quoteProfession'>{randomQuoteData.profession}</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
