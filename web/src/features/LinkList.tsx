import { Flex, styled } from '$/jsx'
import { Card, SmallButton, Text } from '@/design-system/components'
import { DownloadSimple, Link } from '@phosphor-icons/react'
import LinkListItem, { LinkListItemProps } from './LinkListItem'
import { colors } from '@/design-system/tokens'
import { listLinksRequest } from '@/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { exportLinksRequest } from '@/api/export-links'

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

const LinkListContainer = styled(Flex, {
  base: {
    flexDirection: 'column',
    lg: {
      maxHeight: 'calc(100dvh - 440px)',
      overflowY: 'auto'
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
    },
    refetchOnWindowFocus: true
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

  const { mutate: exportLinks } = useMutation({
    mutationFn: exportLinksRequest,
    onSuccess: response => {
      const [_, data] = response
      if (data) {
        window.open(data.reportUrl, '_blank')
      }
    }
  })

  return (
    <LinkListCard>
      <Flex alignItems="center" justifyContent="space-between">
        <Text.h1 textStyle="textLg" color="gray600">
          Meus links
        </Text.h1>
        <SmallButton onClick={() => exportLinks()}>
          <DownloadSimple />
          <span>Baixar CSV</span>
        </SmallButton>
      </Flex>
      {links.length > 0 ? (
        <LinkListContainer>
          {links.map(link => (
            <LinkListItem key={link.alias} {...link} />
          ))}
        </LinkListContainer>
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
