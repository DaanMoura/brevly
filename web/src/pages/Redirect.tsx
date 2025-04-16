import { Flex, styled } from '$/jsx'
import { Card, Text } from '@/design-system/components'

import LogoIcon from '@/design-system/assets/Logo_Icon.svg'

const LogoIconImg = styled('img', {
  base: {
    width: 48,
    height: 48
  }
})

const Redirect = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100dvh"
    >
      <Card
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth="580"
        height="296"
        margin="12"
        padding="20"
        gap="24"
      >
        <LogoIconImg src={LogoIcon} alt="Ícone da Brevly" />
        <Text.h1 color="gray600" textStyle="textXl">
          Redirecionando...
        </Text.h1>
        <Flex direction="column" alignItems="center" color="gray500" textStyle="textMd">
          <Text.p>O link será aberto automaticamente em alguns instantes.</Text.p>
          <Text.p>
            Não foi redirecionado? <Text.a color="blueBase">Acesse aqui</Text.a>
          </Text.p>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Redirect
