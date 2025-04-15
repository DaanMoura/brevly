import { styled } from '$/jsx'

const IconButton = styled('button', {
  base: {
    display: 'flex',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    p: 8,
    gap: 6,

    backgroundColor: 'gray200',
    color: 'gray500',
    borderRadius: 4,

    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,

    textStyle: 'textSm',

    '&:hover': {
      backgroundColor: 'blueBase'
    },

    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none'
    },

    '& > svg': {
      color: 'gray600',
      stroke: 'gray600'
    }
  }
})

export default IconButton
