import { Flex, styled } from '$/jsx'
import { Text } from '@/design-system/components'
import SmallButton from '@/design-system/components/SmallButton'
import { Copy, Trash } from '@phosphor-icons/react'
import { useCallback } from 'react'

const LinkItemContainer = styled(Flex, {
  base: {
    alignItems: 'center',
    py: 16,
    borderTop: '1px solid',
    borderColor: 'gray200',
    gap: 16
  }
})

export interface LinkListItemProps {
  shortUrl: string
  originalUrl: string
  accessCount: number
}

const LinkListItem = ({ shortUrl, originalUrl, accessCount }: LinkListItemProps) => {
  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(shortUrl)
  }, [shortUrl])

  const onDeleteClick = useCallback(() => {
    console.log('TODO: delete link')
  }, [])

  return (
    <LinkItemContainer>
      <Flex direction="column" gap="4">
        <Text.p color="blueBase" textStyle="textMd">
          {shortUrl}
        </Text.p>
        <Text.p color="gray500" textStyle="textSm">
          {originalUrl}
        </Text.p>
      </Flex>
      <Flex alignItems="center" ml="auto" gap="20">
        <Text.p color="gray500" textStyle="textSm">
          {accessCount} acessos
        </Text.p>
        <Flex alignItems="center" gap="4">
          <SmallButton title="Copiar" onClick={onCopyClick}>
            <Copy />
          </SmallButton>
          <SmallButton title="Deletar" onClick={onDeleteClick}>
            <Trash />
          </SmallButton>
        </Flex>
      </Flex>
    </LinkItemContainer>
  )
}

export default LinkListItem
