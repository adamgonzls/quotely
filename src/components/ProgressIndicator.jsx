import './ProgressIndicator.css'

// pass the seconds as props, then divide the screen width of 100% by the total amount of seconds and the width
export default function ProgressIndicator({ DEFAULT_TIMER, remainingTime }) {
  console.log(remainingTime)
  const fullWidth = 100

  const progressWidth = fullWidth / (DEFAULT_TIMER / remainingTime)

  // progressIndicator should be the total width (100%) divided by the amount of seconds
  // progressBar should be remaining seconds
  return (
    <div className='progress'>
      <div
        className='progress__indicator'
        style={{
          width: `${progressWidth}%`,
          backgroundColor: 'green',
          height: '1em',
        }}
      ></div>
    </div>
  )
}
