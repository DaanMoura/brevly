import { styled } from '$/jsx'

const SmallButton = styled('button', {
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

    cursor: 'pointer',

    '&:hover': {
      borderColor: 'blueBase'
    },

    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none'
    },

    '& > svg': {
      fontSize: 16,
      color: 'gray600',
      stroke: 'gray600'
    }
  }
})

export default SmallButton
