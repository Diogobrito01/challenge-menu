# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


**Utilizei React com Typescript, utilizei o Materialize (MUI), para importações de bibliotecas e design, utilizei redux, hooks.**

**Para chamar a API, foi utilizado o reduxjs/toolkit, pela a funcionalidade createAsyncThumk e createSlice para adicionar informações de detalhes para serem utilizadas no Store.**

**Pelo o tempo hábil, não desenvolvi algumas partes, como a adição do contador de itens ao lado do item da listagem, entre outros ajustes que são necessários,**

**Algumas imagens não estão disponíveis, provavelmente por conta do servidor de imagens, estão quebradas.**

**Iria criar alguns componentes para internacionalizar os padrões monetários por região, a priori deixei o padrão PT-BR.**


Foram instaladas as dependências para auxílio no desenvolvimento:

@emotion/react: Biblioteca de CSS-in-JS para estilizar componentes React.

@emotion/styled: Ferramenta para criar componentes estilizados com Emotion.

@mui/icons-material: Conjunto de ícones para Material-UI.

@mui/material: Biblioteca de componentes UI baseada em Material Design.

@reduxjs/toolkit: Toolkit oficial para Redux, para simplificar a escrita de lógica Redux.

@testing-library/jest-dom: Extensões para testar DOM com Jest.

@testing-library/react: Utilitários para testar componentes React.

@testing-library/user-event: API para simular interações do usuário em testes.

@types/jest: Tipos TypeScript para Jest.

@types/node: Tipos TypeScript para Node.js.

@types/react: Tipos TypeScript para React.

@types/react-dom: Tipos TypeScript para React DOM.

@types/react-router-dom: Tipos TypeScript para React Router DOM.

axios: Cliente HTTP baseado em Promises para fazer requisições HTTP.

http-proxy-middleware: Middleware para criar proxies HTTP.

lodash: Biblioteca utilitária que oferece suporte a operações comuns de programação.

react: Biblioteca para construir interfaces de usuário.

react-dom: Pacote que fornece métodos específicos do DOM que podem ser usados no nível superior de uma aplicação React.

react-redux: Integração de React com Redux.

react-router-dom: Roteador para aplicações React.

react-scripts: Scripts e configuração usada por Create React App.

styled-components: Biblioteca para estilização de componentes React usando tagged template literals.

typescript: Superset de JavaScript que adiciona tipagem estática opcional.

web-vitals: Biblioteca para medir métricas de desempenho de web vitals.


Visão Geral do Diretório Store

index.ts
Este arquivo configura e exporta a store do Redux, combinando todos os slices individuais (restaurant e basket) em um único root reducer e configurando os tipos necessários para a aplicação.

restaurantSlice.ts
Este slice gerencia o estado relacionado aos detalhes do restaurante e às informações do menu. Inclui thunks assíncronos para buscar detalhes do restaurante e do menu do servidor, lidando com estados de carregamento, sucesso e erro.

basketSlice.ts
Este slice gerencia o estado do carrinho de compras, lidando com ações para adicionar, incrementar, decrementar e remover itens do carrinho. Mantém tanto a lista de itens quanto um mapa de quantidades para rastrear contagens de itens de forma única por id e opções selecionadas.

Componentes
Cart.tsx - Exibe os itens adicionados ao carrinho. Permite ao usuário ajustar a quantidade de cada item ou removê-los completamente. Mostra o subtotal e o total do carrinho.

Header.tsx - Exibe o cabeçalho do site, incluindo a imagem do banner do restaurante e botões de navegação (MENU, LOGIN, CONTACT).

ItemModal.tsx - Modal que permite ao usuário selecionar opções (como quantidade de carnes) e quantidade de um item antes de adicioná-lo ao carrinho.

MenuItem.tsx - Exibe informações de um item do menu, incluindo nome, descrição, preço e imagem. Mostra a quantidade do item no carrinho.

MenuSection.tsx - Agrupa e exibe os itens do menu em seções, como "Burgers" e "Drinks".

MenuTabs.tsx - Exibe abas de navegação para diferentes seções do menu, permitindo que o usuário mude entre elas.

RemoveItemConfirmation.tsx - Modal que solicita a confirmação do usuário para remover um item do carrinho.

SearchBar.tsx - Barra de pesquisa que permite ao usuário procurar por itens no menu.

SectionIcons.tsx - Exibe ícones representando as diferentes seções do menu, permitindo que o usuário navegue entre elas.
