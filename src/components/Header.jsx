import './Header.css'

export default function Header({ handleGetRandomQuote }) {
  return (
    <header>
      <button onClick={handleGetRandomQuote}>Random Quote</button>
    </header>
  )
}
