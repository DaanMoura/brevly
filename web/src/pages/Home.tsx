import { Flex, styled } from '$/jsx'
import CreateLink from '@/features/CreateLink'
import LinkList from '@/features/LinkList'

import Logo from '@/design-system/assets/Logo.svg'

const LogoContainer = styled('img', {
  base: {
    mb: 12
  }
})

const Home = () => {
  return (
    <Flex alignItems="center" direction="column" width="100%" gap="12" py="32">
      <LogoContainer src={Logo} />
      <CreateLink />
      <LinkList />
    </Flex>
  )
}

export default Home
