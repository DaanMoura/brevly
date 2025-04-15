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

    '&:hover': {
      backgroundColor: 'blueDark'
    },

    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none'
    }
  }
})

export default Button
