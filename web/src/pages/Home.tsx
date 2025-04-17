import { Flex, styled } from '$/jsx'
import CreateLink from '@/features/CreateLink'
import LinkList from '@/features/LinkList'

import Logo from '@/design-system/assets/Logo.svg'

const PageContainer = styled(Flex, {
  base: {
    mx: 'auto',
    width: 'fit-content',

    alignItems: 'center',
    flexDirection: 'column',
    gap: '24',
    py: '32',
    px: '12',

    lg: {
      mt: 88,
      alignItems: 'start'
    }
  }
})

const ContentContainer = styled(Flex, {
  base: {
    flexDirection: 'column',
    gap: '12',

    lg: {
      flexDirection: 'row',
      gap: '20'
    }
  }
})

const Home = () => {
  return (
    <PageContainer>
      <img src={Logo} alt="Logo da Brevly" />
      <ContentContainer>
        <CreateLink />
        <LinkList />
      </ContentContainer>
    </PageContainer>
  )
}

export default Home
