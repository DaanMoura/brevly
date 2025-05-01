import { styled } from '$/jsx'

const Button = styled('button', {
  base: {
    display: 'flex',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    px: 16,

    backgroundColor: 'blueBase',
    color: 'white',
    borderRadius: 8,
    textStyle: 'textMd',

    cursor: 'pointer',

    transition: '0.2s',

    '&:hover': {
      backgroundColor: 'blueDark'
    },

    '&:active': {
      transform: 'scale(0.95)'
    },

    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  }
})

export default Button
