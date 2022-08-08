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
          New quote
        </button>
        <button className='brandButton' onClick={handleGetRandomImage}>
          New image
        </button>
      </div>
    </header>
  )
}
