## Funcionalidades e Regras

- [x]  Deve ser possível criar um link
    - [x]  Não deve ser possível criar um link com URL encurtada mal formatada
    - [x]  Não deve ser possível criar um link com URL encurtada já existente
      - [x] Validar erro de forma melhor
- [x]  Deve ser possível deletar um link
- [x]  Deve ser possível obter a URL original por meio de uma URL encurtada
  - [ ] Checar se alias é suficiente ou precisa ser necessariamente a URL em si
- [x]  Deve ser possível listar todas as URL’s cadastradas
- [x]  Deve ser possível incrementar a quantidade de acessos de um link
- [x]  Deve ser possível exportar os links criados em um CSV
    - [x]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [x]  Deve ser gerado um nome aleatório e único para o arquivo
    - [x]  Deve ser possível realizar a listagem de forma performática
    - [x]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

## Testes
- [x] create link
- [x] get links
- [x] get one link
- [x] delete link
- [x] increment access count
- [x] generate csv
