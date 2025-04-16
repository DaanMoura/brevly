import { Flex } from '$/jsx'
import { Card, Text } from '@/design-system/components'

import ErrorAsset from '@/design-system/assets/404.svg'

const NotFound = () => {
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
        <img src={ErrorAsset} alt="404" />
        <Text.h1 color="gray600" textStyle="textXl">
          Link não encontrado
        </Text.h1>
        <Text.p maxWidth="484" textAlign="center" color="gray500" textStyle="textMd">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          Saiba mais em{' '}
          <Text.a href="/" color="blueBase">
            brev.ly
          </Text.a>
        </Text.p>
      </Card>
    </Flex>
  )
}

export default NotFound
