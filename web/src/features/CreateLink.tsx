import { Flex, styled } from '$/jsx'
import { createLinkRequest } from '@/api'
import { Button, Card, InputField, Text } from '@/design-system/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CreateLinkCard = styled(Card, {
  base: {
    gap: '24',

    lg: {
      width: 380
    }
  }
})

const Form = styled('form', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24',
    width: '100%'
  }
})

const createLinkForm = z.object({
  originalUrl: z.string().nonempty('Campo obrigatório').url('URL inválida'),
  alias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, 'Link encurtado inválido')
    .nonempty('Campo obrigatório')
})

type CreateLinkForm = z.infer<typeof createLinkForm>

const CreateLink = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateLinkForm>({ resolver: zodResolver(createLinkForm) })

  const { mutateAsync: createLink } = useMutation({
    mutationFn: createLinkRequest
  })

  const handleCreateLink = async (data: CreateLinkForm) => {
    try {
      await createLink(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CreateLinkCard>
      <Text.h1 textStyle="textLg" color="gray600">
        Novo link
      </Text.h1>
      <Form onSubmit={handleSubmit(handleCreateLink)}>
        <Flex flexDirection="column" gap="16">
          <InputField.Root>
            <InputField.Label>Link original</InputField.Label>
            <InputField.InputContainer>
              <InputField.Input
                aria-invalid={!!errors.originalUrl}
                {...register('originalUrl')}
                id="originalUrl"
                placeholder="www.exemplo.com.br"
              />
            </InputField.InputContainer>
            <InputField.ErrorMessage>{errors.originalUrl?.message}</InputField.ErrorMessage>
          </InputField.Root>

          <InputField.Root>
            <InputField.Label>Link encurtado</InputField.Label>
            <InputField.InputContainer>
              <InputField.Prefix>brev.ly/</InputField.Prefix>
              <InputField.Input aria-invalid={!!errors.alias} {...register('alias')} id="alias" />
            </InputField.InputContainer>
            <InputField.ErrorMessage>{errors.alias?.message}</InputField.ErrorMessage>
          </InputField.Root>
        </Flex>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar link'}
        </Button>
      </Form>
    </CreateLinkCard>
  )
}

export default CreateLink
