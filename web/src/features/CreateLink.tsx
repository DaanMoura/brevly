import { Flex } from '$/jsx'
import { Button, Card, InputField, Text } from '@/design-system/components'
import { useState } from 'react'

const CreateLink = () => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  return (
    <Card gap="24">
      <Text.h1 textStyle="textLg" color="gray600">
        Novo link
      </Text.h1>
      <Flex flexDirection="column" gap="16">
        <InputField.Root>
          <InputField.Label>Link original</InputField.Label>
          <InputField.Input
            placeholder="www.exemplo.com.br"
            value={originalUrl}
            onChange={e => setOriginalUrl(e.target.value)}
          />
          {/* <InputField.ErrorMessage></InputField.ErrorMessage> */}
        </InputField.Root>

        <InputField.Root>
          <InputField.Label>Link encurtado</InputField.Label>
          <InputField.Input
            placeholder="brev.ly/"
            value={shortUrl}
            onChange={e => setShortUrl(e.target.value)}
          />
          {/* <InputField.ErrorMessage></InputField.ErrorMessage> */}
        </InputField.Root>
      </Flex>
      <Button>Salvar link</Button>
    </Card>
  )
}

export default CreateLink
