import './Header.css'

export default function Header({ handleGetRandomQuote }) {
  return (
    <header>
      <button className='brandButton' onClick={handleGetRandomQuote}>
        New Quote
      </button>
    </header>
  )
}
