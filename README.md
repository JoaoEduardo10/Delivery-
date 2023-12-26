# Delivery (Front End para Sistema de Entregas de Carnês)

Bem-vindo ao Front End do sistema de entregas de carnês, uma aplicação dedicada a registrar eficientemente as entregas de carnês e identificar os responsáveis por cada entrega.

## Funcionalidades Principais:

- **Registro de Entregas:** Facilita o processo de registro de entregas de carnês de forma simples e intuitiva.

- **Atribuição de Responsabilidade:** Permite identificar e registrar quem realizou cada entrega de carnê, garantindo transparência e rastreabilidade.

## Tecnologias Utilizadas:

- [**Next.js 14**](https://nextjs.org/docs)
- [**sass**](https://sass-lang.com/install/)
- [**react-icons**](https://react-icons.github.io/react-icons/)
- [**vitest**](https://vitest.dev/guide/)
- [**validator**](https://www.npmjs.com/package/validator)
- [**uuid**](https://www.npmjs.com/package/uuid)
- [**react-spinners**](https://www.davidhu.io/react-spinners/)
- [**axios**](https://axios-http.com/docs/intro)

## Dependências do Projeto

**Observação:** Para acessar esses projetos, é necessário ser um colaborador no repositório da Interativa, já que eles são privados.

- [**microsoft_authentication_system**](https://github.com/interativa-telecom/microsoft_authentication_system)
- [**deliveryTrackerAPI**](https://github.com/interativa-telecom/deliveryTrackerAPI)

## Arquitetura

- **.storybook:** Contém toda a configuração para o funcionamento do Storybook, uma ferramenta que atua como documentador de componentes.

- **public:** Local destinado à logo do projeto e ao arquivo de configuração PWA (Progressive Web App), conhecido como manifest.

- **src:** Contém o projeto em sua totalidade.

  - **app:** Responsável pelas rotas do Next.js. Para mais informações sobre o novo sistema de rotas no Next.js 14, consulte o seguinte link: [**Next.Js 14/rotas**](**https://nextjs.org/docs/app/building-your-application/routing/defining-routes**).

  - **components:** Armazena componentes reutilizáveis do sistema.

  - **helpers:** Guarda todos os codigos reutilizaveis do projeto

  - **interfaces:** Mantém as interfaces globais utilizadas no projeto.

  - **libs:** Configura todas as tecnologias externas do projeto.

  - **styles:** Configurações de estilos utilizando Sass.

  - **template:** Configurações dos templates.

- **tests:** Contém a configuração inicial dos testes.

## Instruções de Uso

Antes de tudo, instale as dependências do projeto e adicione o aquivo **.env**:

### Configuração do Arquivo **.env**

Este projeto requer um arquivo de configuração **.env** para definir variáveis de ambiente importantes. Certifique-se de criar na raiz do projeto e configure as seguintes variáveis:

```bash
# api do repositório microsoft_authentication_system
NEXT_PUBLIC_LOGIN_API=http://192.168.1.194:7000/v1

# api do repositório deliveryTrackerAPI
NEXT_PUBLIC_DELIVERY_API=http://192.168.1.194:8000/v1

#tipo do teken
NEXT_PUBLIC_TYPE_AUTHORIZATION=interativabr

```

### Considerações Específica

Este projeto foi estruturado com base no uso do banco de dados MongoDb e da API do IXC. Se você estiver utilizando outro provedor de banco de dados ou Outra API, pode ser necessário fazer ajustes em algumas partes do projeto para garantir a compatibilidade.

### Arquivo **.env.example**

Se precisar de mais orientações, você pode consultar o arquivo **.env.example** incluído neste projeto como referência. Ele fornece um exemplo das variáveis de ambiente que você precisa configurar.

## Instalação das Dependências

```bash
yarn
```

ou

```bash
npm install
```

### Teste

Para executar os testes:

```bash
yarn test
```

ou

```bash
npm run test
```

### Executando o Projeto em Produção

Siga as etapas abaixo:

1. Gere o build:

```bash
yarn build
```

ou

```bash
npm run build
```

2. Após gerar o build, inicie o projeto com o comando:

```bash
yarn start
```

ou

```bash
npm start
```

### Executando o Projeto em Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```bash
yarn dev
```

ou

```bash
npm run dev
```

### Executando o StoryBoook

Para executar o projeto em modo de desenvolvimento:

```bash
yarn storybook
```

ou

```bash
npm run storybook
```
