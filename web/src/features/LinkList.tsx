import { Flex, styled } from '$/jsx'
import { Card, SmallButton, Text } from '@/design-system/components'
import { DownloadSimple, Link, SpinnerGap } from '@phosphor-icons/react'
import LinkListItem, { LinkListItemProps } from './LinkListItem'
import { colors } from '@/design-system/tokens'
import { listLinksRequest } from '@/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { exportLinksRequest } from '@/api/export-links'
import LoadingBar from '@/design-system/components/LoadingBar'

const AnimatedSpinnerGap = styled(SpinnerGap, {
  base: {
    animation: 'spin 1s linear infinite'
  }
})

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
    padding: 0,

    lg: {
      width: 580,
      padding: 0
    }
  }
})

const CardContent = styled(Flex, {
  base: {
    flexDirection: 'column',
    gap: '20',
    padding: 24,
    lg: {
      padding: 32
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
  const { data, isPending } = useQuery({
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

  const { mutate: exportLinks, isPending: isExportPending } = useMutation({
    mutationFn: exportLinksRequest,
    onSuccess: response => {
      const [error, data] = response
      if (error) {
        throw error
      }
      if (data.reportUrl) {
        fetch(data.reportUrl)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = 'links.csv'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
          })
      }
    }
  })

  return (
    <LinkListCard>
      {isPending && <LoadingBar />}
      <CardContent>
        <Flex alignItems="center" justifyContent="space-between">
          <Text.h1 textStyle="textLg" color="gray600">
            Meus links
          </Text.h1>
          <SmallButton disabled={isExportPending} onClick={() => exportLinks()}>
            {isExportPending ? <AnimatedSpinnerGap /> : <DownloadSimple />}
            <span>Baixar CSV</span>
          </SmallButton>
        </Flex>

        {links.length > 0 ? (
          <LinkListContainer>
            {links.map(link => (
              <LinkListItem key={link.alias} {...link} />
            ))}
          </LinkListContainer>
        ) : isPending ? (
          <EmptyStateContainer>
            <Link size={32} color={colors.gray400.value} />
            <Text.p color="gray500" textStyle="textXs">
              Carregando links...
            </Text.p>
          </EmptyStateContainer>
        ) : (
          <EmptyStateContainer>
            <Link size={32} color={colors.gray400.value} />
            <Text.p color="gray500" textStyle="textXs">
              Ainda não existem links cadastrados
            </Text.p>
          </EmptyStateContainer>
        )}
      </CardContent>
    </LinkListCard>
  )
}

export default LinkList
