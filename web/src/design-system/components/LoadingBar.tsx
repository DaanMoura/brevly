import { styled } from '$/jsx'

const LoadingBarContainer = styled('div', {
  base: {
    position: 'relative',
    width: '100%',
    height: 4,
    overflow: 'hidden'
  }
})

const LoadingBarIndicator = styled('div', {
  base: {
    position: 'absolute',
    top: 0,
    left: '-30%',
    width: '30%',
    height: '100%',
    backgroundColor: 'blueBase',
    animationName: 'indeterminate',
    animationDuration: '1s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite'
  }
})

const LoadingBar = () => (
  <LoadingBarContainer>
    <LoadingBarIndicator />
  </LoadingBarContainer>
)

export default LoadingBar
