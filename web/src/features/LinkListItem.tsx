import { Flex, styled } from '$/jsx'
import { deleteLinkRequest } from '@/api'
import { Text } from '@/design-system/components'
import SmallButton from '@/design-system/components/SmallButton'
import { env } from '@/env'
import { Copy, Trash } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

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
  alias: string
  originalUrl: string
  accessCount: number
}

const LinkListItem = ({ alias, originalUrl, accessCount }: LinkListItemProps) => {
  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(`${env.VITE_FRONTEND_URL}/${alias}`)
  }, [alias])

  const { mutateAsync: deleteLink } = useMutation({
    mutationFn: deleteLinkRequest
  })

  const onDeleteClick = useCallback(() => {
    deleteLink(alias)
  }, [alias, deleteLink])

  const accessCountText = useMemo(() => {
    return `${accessCount} ${accessCount === 1 ? 'acesso' : 'acessos'}`
  }, [accessCount])

  return (
    <LinkItemContainer>
      <Flex direction="column" gap="4">
        <Text.a href={`/${alias}`} textDecoration="none" color="blueBase" textStyle="textMd">
          brev.ly/{alias}
        </Text.a>
        <Text.p color="gray500" textStyle="textSm">
          {originalUrl}
        </Text.p>
      </Flex>
      <Flex alignItems="center" ml="auto" gap="20">
        <Text.p color="gray500" textStyle="textSm">
          {accessCountText}
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
