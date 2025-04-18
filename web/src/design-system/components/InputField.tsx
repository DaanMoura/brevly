import { Flex, styled } from '$/jsx'
import { Warning } from '@phosphor-icons/react'
import { colors } from '../tokens'

const Root = styled(Flex, {
  base: {
    flexDirection: 'column',
    gap: 8,

    '&:has(input:active), &:has(input:focus)': {
      '& label': {
        color: 'blueBase',
        fontWeight: 'bold'
      }
    },

    '&:has(input:invalid), &:has(input[aria-invalid="true"])': {
      '& label': {
        color: 'danger',
        fontWeight: 'bold'
      },

      '& div.error-message': {
        height: 20,
        visibility: 'visible',
        opacity: 1
      }
    }
  }
})

const Label = styled('label', {
  base: {
    textStyle: 'textXs',
    color: 'gray500',
    transition: '0.2s ease'
  }
})

const Prefix = styled('span', {
  base: {
    textStyle: 'textMd',
    color: 'gray400'
  }
})

const InputContainer = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    height: 48,
    px: 16,
    textStyle: 'textMd',
    color: 'gray600',
    boxShadow: '0 0 0 1px {colors.gray300}',
    transition: '0.2s ease',

    '&:has(input:active), &:has(input:focus)': {
      boxShadow: '0 0 0 1.5px {colors.blueBase}'
    },

    '&:has(input:invalid), &:has(input[aria-invalid="true"])': {
      boxShadow: '0 0 0 1.5px {colors.danger}'
    }
  }
})

const Input = styled('input', {
  base: {
    width: '100%',
    textStyle: 'textMd',
    color: 'gray600',
    caretColor: 'blueBase',

    '&::placeholder': {
      color: 'gray400'
    },

    '&:focus': {
      outline: 'none'
    }
  }
})

const ErrorMessageContainer = styled('div', {
  base: {
    display: 'flex',
    gap: 8,
    textStyle: 'textSm',
    color: 'gray500',

    // minHeight: 20,
    // visibility: 'hidden',
    height: 0,
    opacity: 0,
    transition: 'opacity 0.2s ease'
  }
})

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <ErrorMessageContainer role="alert" aria-live="polite" className="error-message">
    <Warning color={colors.danger.value} size={16} />
    {children}
  </ErrorMessageContainer>
)

const InputField = {
  Root,
  Label,
  Prefix,
  InputContainer,
  Input,
  ErrorMessage
}

export default InputField
