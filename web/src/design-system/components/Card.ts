import { Flex, styled } from '$/jsx'

const Card = styled(Flex, {
  base: {
    flexDirection: 'column',
    padding: 24,
    borderRadius: 8,
    backgroundColor: 'gray100',
    width: 366,
    height: 'fit-content',
    overflow: 'hidden',

    lg: {
      padding: 32
    }
  }
})

export default Card
