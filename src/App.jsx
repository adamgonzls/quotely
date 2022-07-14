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
    backgroundImageURL:
      'https://images.unsplash.com/photo-1545431781-3e1b506e9a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDU3MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc3NzE0NjY&ixlib=rb-1.2.1&q=80&w=1080',
  })
  const [allQuotesData, setAllQuotesData] = useState([])
  const [unsplashImagesArray, setUnsplashImagesArray] = useState([])

  console.log(randomQuoteObj)
  console.log(unsplashImagesArray)

  useEffect(() => {
    fetch(`https://adams-quote-api-v1.herokuapp.com/quotes`)
      .then((res) => res.json())
      .then((data) => setAllQuotesData(data))
  }, [])

  useEffect(() => {
    console.log('initial call to unsplash API')
    fetch(
      `https://api.unsplash.com/photos/random/?client_id=RyjdpW1hxq8mSR8fAHEE8pUNx38fSXjgdnd0UeBCVu4&query=abstract&count=30`
    )
      .then((res) => res.json())
      .then((data) => setUnsplashImagesArray(data))
    // getRandomUnsplashImage()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval call to getRandomUnsplashImage()')
      getRandomUnsplashImage()
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  function handleGetRandomQuote() {
    const randomQuoteData =
      allQuotesData[Math.floor(Math.random() * allQuotesData.length)]
    console.log(randomQuoteData)
    setRandomQuoteObj((prevData) => {
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
  }

  function getRandomUnsplashImage() {
    console.log('give me a random image')
    const randomImage =
      unsplashImagesArray[
        Math.floor(Math.random() * unsplashImagesArray.length)
      ]
    console.log(unsplashImagesArray)
    console.log(randomImage.urls.regular)
    const randomImageURL = randomImage.urls.regular
    setRandomQuoteObj((prevData) => {
      return {
        ...prevData,
        backgroundImageURL: randomImageURL,
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
