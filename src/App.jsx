import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  const DEFAULT_TIMER = 15
  const [selectedQuoteData, setSelectedQuoteData] = useState({
    author: '',
    id: null,
    profession: '',
    quote: '',
    backgroundImageURL:
      'https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDU3MzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTk4NDM1ODg&ixlib=rb-1.2.1&q=80&w=1080',
  })
  const [allQuotesDataFromAPI, setAllQuotesDataFromAPI] = useState([])
  const [quotesDataCopy, setQuotesDataCopy] = useState([])
  const [imagesData, setImagesData] = useState(
    JSON.parse(localStorage.getItem('imagesData')) || null
  )
  const [remainingTime, setRemainingTime] = useState(DEFAULT_TIMER)

  useEffect(() => {
    async function getQuotesFromAPI() {
      const res = await fetch(`https://adams-quote-api-v1.herokuapp.com/quotes`)
      const data = await res.json()
      setAllQuotesDataFromAPI(data)
      setQuotesDataCopy(data)
    }
    getQuotesFromAPI()
  }, [])

  useEffect(() => {
    if (!imagesData) {
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
    if (allQuotesDataFromAPI.length) {
      handleGetRandomQuote()
    }
  }, [allQuotesDataFromAPI])

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
        // console.log(remainingTime)
        setRemainingTime((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [imagesData, remainingTime])

  // useEffect(() => {
  //   console.log('selected quote data changed')
  //   const mainContainer = document.getElementById('mainContainer')
  //   mainContainer.className.add('fadeImage')
  // }, [selectedQuoteData])

  function handleGetRandomQuote() {
    if (quotesDataCopy.length - 1 === 0) {
      setQuotesDataCopy(allQuotesDataFromAPI)
    }
    const randomNumber = Math.floor(Math.random() * quotesDataCopy.length)
    const selectedQuoteData = quotesDataCopy[randomNumber]

    setSelectedQuoteData((prevData) => {
      return {
        ...prevData,
        author: selectedQuoteData.author ? selectedQuoteData.author : '',
        id: selectedQuoteData.id,
        profession: selectedQuoteData.profession
          ? selectedQuoteData.profession
          : '',
        quote: selectedQuoteData.quote,
      }
    })

    setQuotesDataCopy((prevData) => {
      return prevData.filter((item) => item !== selectedQuoteData)
    })

    setRemainingTime(DEFAULT_TIMER)
  }

  function handleGetRandomImage() {
    const randomImage =
      imagesData[Math.floor(Math.random() * imagesData.length)]
    const randomImageURL = randomImage.urls.regular
    setSelectedQuoteData((prevData) => {
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
        DEFAULT_TIMER={DEFAULT_TIMER}
        remainingTime={remainingTime}
      />
      <main
        id='mainContainer'
        style={{
          backgroundImage: `url(${selectedQuoteData.backgroundImageURL})`,
          // opacity: remainingTime <= 3 ? 0 : 1,
          // transition: remainingTime <= 3 && 'opacity 3s ease-in-out',
        }}
      >
        <div className='quoteContainer'>
          <h1 className='quote'>{selectedQuoteData.quote}</h1>
          {selectedQuoteData.author && (
            <p className='quoteAuthor'>{selectedQuoteData.author}</p>
          )}
          {selectedQuoteData.profession && (
            <p className='quoteProfession'>{selectedQuoteData.profession}</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
