import { Flex, styled } from '$/jsx'
import { Card, SmallButton, Text } from '@/design-system/components'
import { DownloadSimple, Link } from '@phosphor-icons/react'
import LinkListItem, { LinkListItemProps } from './LinkListItem'
import { colors } from '@/design-system/tokens'
import { listLinksRequest } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const EmptyStateContainer = styled(Flex, {
  base: {
    flexDirection: 'column',
    borderTop: '1px solid',
    borderColor: 'gray200',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    gap: 12,
    pt: 32,
    pb: 24
  }
})

const LinkListCard = styled(Card, {
  base: {
    gap: '20',

    lg: {
      width: 580
    }
  }
})

const LinkList = () => {
  const { data } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const [error, data] = await listLinksRequest()
      if (error) {
        throw error
      }
      return data
    }
  })

  const links: LinkListItemProps[] = useMemo(() => {
    return (
      data?.links.map(link => ({
        alias: link.alias,
        originalUrl: link.originalUrl,
        accessCount: link.accessCount
      })) ?? []
    )
  }, [data])

  return (
    <LinkListCard>
      <Flex alignItems="center" justifyContent="space-between">
        <Text.h1 textStyle="textLg" color="gray600">
          Meus links
        </Text.h1>
        <SmallButton>
          <DownloadSimple />
          <span>Baixar CSV</span>
        </SmallButton>
      </Flex>
      {links.length > 0 ? (
        <Flex direction="column">
          {links.map(link => (
            <LinkListItem key={link.alias} {...link} />
          ))}
        </Flex>
      ) : (
        <EmptyStateContainer>
          <Link size={32} color={colors.gray400.value} />
          <Text.p color="gray500" textStyle="textXs">
            Ainda não existem links cadastrados
          </Text.p>
        </EmptyStateContainer>
      )}
    </LinkListCard>
  )
}

export default LinkList
