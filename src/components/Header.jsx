import ProgressIndicator from './ProgressIndicator'
import './Header.css'

export default function Header({
  handleGetRandomQuote,
  handleGetRandomImage,
  DEFAULT_TIMER,
  remainingTime,
}) {
  return (
    <header>
      <ProgressIndicator
        DEFAULT_TIMER={DEFAULT_TIMER}
        remainingTime={remainingTime}
      />
      <div className='buttonContainer'>
        <button className='brandButton' onClick={handleGetRandomQuote}>
          New Quote
        </button>
        <button className='brandButton' onClick={handleGetRandomImage}>
          New Image
        </button>
      </div>
    </header>
  )
}
