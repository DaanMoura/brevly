import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  textXl: {
    value: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 'bold'
    }
  },
  textLg: {
    value: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 'bold'
    }
  },
  textMd: {
    value: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 600
    }
  },
  textSm: {
    value: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 'normal'
    }
  },
  textXs: {
    value: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '10px',
      lineHeight: '14px',
      fontWeight: 'normal',
      textTransform: 'uppercase'
    }
  }
})
