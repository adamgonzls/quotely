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
      <div className='userArea'>
        <div className='buttonContainer'>
          <button className='brandButton' onClick={handleGetRandomQuote}>
            New quote
          </button>
          <button className='brandButton' onClick={handleGetRandomImage}>
            New image
          </button>
        </div>
        <div className='usageNotification'>
          <p>
            A new quote will appear automatically every 15 seconds.
            <br />
            Hover/tap above to show the buttons to get another quote.
          </p>
        </div>
      </div>
    </header>
  )
}
