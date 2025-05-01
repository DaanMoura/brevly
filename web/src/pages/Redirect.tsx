import { Flex, styled } from '$/jsx'
import { Card, Text } from '@/design-system/components'

import LogoIcon from '@/design-system/assets/Logo_Icon.svg'
import { useNavigate, useParams } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getLinkRequest } from '@/api/get-link'
import { useMemo } from 'react'
import { increaseLinkAccessRequest } from '@/api/increase-link-access'
import { queryClient } from '@/lib/react-query'

const LogoIconImg = styled('img', {
  base: {
    width: 48,
    height: 48
  }
})

const Redirect = () => {
  const { alias } = useParams()
  const navigate = useNavigate()

  const { mutateAsync: increaseLinkAccess } = useMutation({
    mutationFn: increaseLinkAccessRequest
  })

  const { data: link } = useQuery({
    queryKey: ['link', alias],
    queryFn: async () => {
      if (!alias) {
        throw new Error('Link inválido')
      }

      const [error, data] = await getLinkRequest(alias)
      if (error) {
        if (error.statusCode === 404) {
          navigate(`/${alias}/not-found`)
        }
        throw error
      }

      await increaseLinkAccess(alias)
      queryClient.invalidateQueries({ queryKey: ['links'] })

      window.location.href = data.originalUrl
      return data
    }
  })

  const href = useMemo(() => {
    if (!link) return ''
    return link.originalUrl
  }, [link])

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100dvh"
      px="12"
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
        textAlign="center"
      >
        <LogoIconImg src={LogoIcon} alt="Ícone da Brevly" />
        <Text.h1 color="gray600" textStyle="textXl">
          Redirecionando...
        </Text.h1>
        <Flex direction="column" alignItems="center" color="gray500" textStyle="textMd">
          <Text.p>O link será aberto automaticamente em alguns instantes.</Text.p>
          <Text.p>
            Não foi redirecionado?{' '}
            <Text.a href={href} color="blueBase">
              Acesse aqui
            </Text.a>
          </Text.p>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Redirect
