export default function ProgressIndicator({ DEFAULT_TIMER, remainingTime }) {
  const fullWidth = 100
  const progressWidth = fullWidth / (DEFAULT_TIMER / remainingTime)

  return (
    <div className='progress'>
      <div
        className='progressIndicator'
        style={{
          width: `${progressWidth}%`,
          backgroundColor: 'hsla(340, 71%, 47%, .75)',
          height: '.25em',
          transition: 'width .9s ease',
        }}
      ></div>
    </div>
  )
}
