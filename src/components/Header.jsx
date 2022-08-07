import './Header.css'

export default function Header({ handleGetRandomQuote, handleGetRandomImage }) {
  return (
    <header>
      <button className='brandButton' onClick={handleGetRandomQuote}>
        New Quote
      </button>
      <button className='brandButton' onClick={handleGetRandomImage}>
        New Image
      </button>
    </header>
  )
}
