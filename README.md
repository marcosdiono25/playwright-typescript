# Projeto de Automação de Testes

Este repositório contém a estrutura de automação desenvolvida seguindo padrões utilizados em empresas, com foco em boas práticas, organização e segurança.

## Padrões e Boas Práticas

- Estrutura de pastas organizada para facilitar manutenção e escalabilidade.
- Nomeação de arquivos e métodos seguindo convenções claras.
- Reutilização de código através de classes utilitárias e Page Objects.
- Testes independentes e de fácil leitura.

## Segurança

- Informações sensíveis, como **usuários e senhas**, não são armazenadas diretamente no código.
- Todos os dados sigilosos devem ser configurados em variáveis de ambiente utilizando um arquivo `.env`.
- O arquivo `.env` **não deve ser versionado**. Utilize o `.gitignore` para garantir que ele não seja enviado ao repositório.

## Como executar

1. Clone este repositório.
2. Instale as dependências necessárias.
3. Configure o arquivo `.env` com as variáveis exigidas pelo projeto.
4. Execute os testes utilizando o comando específico do framework adotado.

## Observações

- Este repositório tem caráter profissional e visa refletir padrões aplicados em ambientes corporativos.
- Novas funcionalidades ou frameworks poderão ser adicionados conforme a necessidade do projeto.
