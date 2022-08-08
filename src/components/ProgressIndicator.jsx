export default function ProgressIndicator({ DEFAULT_TIMER, remainingTime }) {
  const fullWidth = 100
  const progressWidth = fullWidth / (DEFAULT_TIMER / remainingTime)

  return (
    <div className='progress'>
      <div
        className='progressIndicator'
        style={{
          width: `${progressWidth}%`,
          backgroundColor: 'rgba(255, 0, 0, 0.45)',
          // background:
          //   'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
          height: '.25em',
          transition: 'width .9s ease',
        }}
      ></div>
    </div>
  )
}
