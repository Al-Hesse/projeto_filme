# 🎬 GUIA COMPLETO DE APRESENTAÇÃO DO PROJETO - PDM
**Disciplina:** Programação para Dispositivos Móveis (PDM)  
**Projeto:** Catálogo e Gerenciador de Filmes (Monorepo Backend + Mobile)  
**Autor:** Al Hesse  

---

## 🎯 1. Visão Geral do Projeto

Este projeto é uma solução completa de ponta a ponta para catálogo e gestão de filmes, estruturado no formato **Monorepo** contendo:
1. **Backend:** API RESTful robusta desenvolvida em **PHP 8 / Laravel**, com autenticação via **Sanctum**, upload de arquivos, documentação e testes automatizados (PHPUnit). Hospedada em nuvem no **Render**.
2. **Frontend Mobile:** Aplicativo nativo multiplataforma desenvolvido em **React Native com Expo** e **TypeScript**, utilizando as melhores práticas do ecossistema React moderno (**React Query**, **React Hook Form**, **Zod**, **Axios** e arquitetura **Feature-based**).

### 🌐 Links e Ambientes
* **API em Produção (Render):** `https://projeto-filme-o03c.onrender.com/api`
* **Repositório Monorepo:** Estrutura unificada com pastas `projeto_filme` (API) e `projeto_filme_app` (Mobile).

---

## 🧱 2. Arquitetura e Tecnologias Utilizadas (Stacks)

```
┌────────────────────────────────────────────────────────────────────────┐
│                          APLICATIVO MOBILE                             │
│       React Native (Expo SDK 58) + TypeScript + React 19               │
│                                                                        │
│  ┌──────────────────┐  ┌────────────────────┐  ┌───────────────────┐  │
│  │   React Query    │  │  React Hook Form   │  │ React Navigation  │  │
│  │  (Server State)  │  │   + Zod (Forms)    │  │  (Native Stack)   │  │
│  └─────────┬────────┘  └─────────┬──────────┘  └─────────┬─────────┘  │
│            └─────────────────────┼───────────────────────┘            │
│                                  ▼                                     │
│                     Axios HTTP Client + Interceptors                   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ JSON / Multipart (HTTPS)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                            BACKEND (API)                               │
│                   PHP 8.3/8.4 + Laravel 11/13                          │
│                                                                        │
│  ┌──────────────────┐  ┌────────────────────┐  ┌───────────────────┐  │
│  │ Laravel Sanctum  │  │  FilmeController   │  │   FilmeResource   │  │
│  │ (Bearer Tokens)  │  │  (CRUD + Storage)  │  │   (API Resource)  │  │
│  └──────────────────┘  └─────────┬──────────┘  └───────────────────┘  │
│                                  ▼                                     │
│                     Eloquent ORM + SQLite/Postgres                     │
│                        Storage Symlink (Uploads)                       │
└────────────────────────────────────────────────────────────────────────┘
```

### 🛠️ Backend Stack (`projeto_filme/`)
* **Linguagem:** PHP 8.3 / 8.4
* **Framework:** Laravel 11/13
* **Banco de Dados:** SQLite (desenvolvimento ágil e testes) / PostgreSQL em produção
* **Autenticação:** Laravel Sanctum (emissão e revogação de Bearer Tokens)
* **Serialização de Dados:** Laravel API Resources (`FilmeResource`)
* **Testes Automatizados:** PHPUnit + DatabaseRefresh (TDD)
* **Containerização:** Docker e Docker Compose (porta mapeada `8088:8000`)
* **Deploy Cloud:** Dockerfile otimizado no Render com execução automática de migrations e storage symlink

### 📱 Frontend Mobile Stack (`projeto_filme_app/`)
* **Framework Base:** React Native 0.88 com Expo SDK 58
* **Linguagem:** TypeScript (100% tipado, estrito, sem uso de `any`)
* **Gerenciamento de Estado do Servidor e Cache:** `@tanstack/react-query` v5
* **Formulários:** `react-hook-form` v7 (gestão de inputs não-controlados com zero renderizações desnecessárias)
* **Validação de Esquemas:** `zod` v4 com `@hookform/resolvers/zod`
* **Navegação:** `@react-navigation/native-stack` v7
* **Cliente HTTP:** `axios` com interceptor de tokens e timeout configurado
* **Persistência de Dados Local:** `@react-native-async-storage/async-storage` (armazena token e sessão)
* **Hardware / Mídia:** `expo-image-picker` (acesso à galeria e câmera do dispositivo)
* **Identidade Visual:** Design System próprio com tema "Dark Cinema" (Fundo `#121214`, cards em vinho `#5C0916`, destaques em vermelho `#E50914`).

---

## ⚙️ 3. Como Funciona o Backend (Detalhamento Técnico)

### 3.1. Modelo de Dados (`Filme`)
A entidade possui 8 atributos principais para atender todos os requisitos de catalogação:
1. `id`: Identificador único (auto-incremento).
2. `titulo`: Nome do filme (String obrigatória).
3. `genero`: Gênero cinematográfico (Ação, Ficção, Drama, etc.).
4. `diretor`: Nome do diretor/diretora.
5. `ano`: Ano de lançamento (inteiro validado entre 1800 e ano atual + 10).
6. `duracao_em_minutos`: Duração do filme em minutos (inteiro positivo).
7. `data_de_lancamento`: Data exata de lançamento (`YYYY-MM-DD`).
8. `foto`: Caminho relativo no disco (`filmes/nome_hash.jpg`) ou URL externa.

### 3.2. Rotas e Permissões (RESTful + Sanctum)
As rotas da API foram divididas estrategicamente em **Públicas** e **Protegidas**:

* **Rotas Públicas (Qualquer pessoa pode ler o catálogo):**
  - `POST /api/register`: Cria novo usuário e retorna token.
  - `POST /api/login`: Autentica usuário e retorna Bearer token.
  - `GET /api/filmes`: Lista todos os filmes ordenados pelos mais recentes.
  - `GET /api/filmes/{id}`: Exibe detalhes completos de um filme específico.

* **Rotas Protegidas (`auth:sanctum` - Requer token no Header `Authorization: Bearer <token>`):**
  - `POST /api/logout`: Revoga e deleta o token atual.
  - `GET /api/me`: Retorna os dados do usuário autenticado.
  - `POST /api/filmes`: Cadastra novo filme com upload opcional de pôster.
  - `PUT /api/filmes/{id}`: Atualiza dados e/ou substitui a foto do filme.
  - `DELETE /api/filmes/{id}`: Remove o filme e deleta o arquivo físico de imagem associado.

### 3.3. Destaques de Engenharia no Backend

1. **Camada de Transformação (`FilmeResource`):**
   - Isola a estrutura do banco de dados da resposta enviada ao cliente.
   - Trata automaticamente o campo `foto`: se for uma URL externa (ex: Unsplash/TMDB), mantém como está; se for upload local, concatena o host base gerando uma URL absoluta acessível pelo app (`https://servidor/storage/filmes/...`).

2. **Gestão Inteligente de Arquivos e Limpeza de Disco:**
   - Na criação: valida formato de imagem (`jpeg, png, webp`), salva com hash seguro no disco `public`.
   - Na edição: se o usuário enviar uma nova foto ou remover a existente, o backend **deleta o arquivo antigo do disco** usando `Storage::disk('public')->delete()`, impedindo arquivos órfãos de acumularem no servidor.
   - Na exclusão: a foto correspondente é removida fisicamente do servidor antes da exclusão do registro no banco.

3. **Compatibilidade Multipart e HTTP Method Spoofing:**
   - O padrão HTTP e a implementação interna do PHP nativo não realizam parse automático de dados binários `multipart/form-data` em métodos `PUT` puros.
   - O projeto resolve isso através do suporte a **HTTP Method Spoofing**: a rota aceita `POST` enviando o campo oculto `_method = PUT`, garantindo upload seguro de imagens em atualizações.

4. **Testes Automatizados (PHPUnit):**
   - O arquivo `tests/Feature/FilmeTest.php` possui testes cobrindo todo o ciclo do CRUD:
     - Listagem com estrutura JSON exata.
     - Criação com e sem upload de foto.
     - Validação de erros e campos obrigatórios.
     - Edição com substituição de imagem física simulada via `UploadedFile::fake()`.
     - Exclusão e confirmação de código HTTP 204.

---

## 📱 4. Como Funciona o Frontend Mobile (Detalhamento Técnico)

### 4.1. Arquitetura Modular por Funcionalidades (Feature-Based)
O código não está espalhado de forma genérica. Ele segue uma separação clara por contextos de negócio dentro de `src/features/`:

```text
src/
├── features/
│   ├── auth/                        # Módulo de Autenticação
│   │   ├── api/auth.api.ts          # Chamadas de login, register e logout
│   │   ├── context/AuthContext.tsx  # Contexto global de autenticação e sessão
│   │   ├── schemas/auth.schema.ts   # Validação de e-mail e senha com Zod
│   │   └── screens/                 # LoginScreen e RegisterScreen
│   │
│   └── filmes/                      # Módulo de Filmes (CRUD Principal)
│       ├── api/
│       │   ├── filmes.api.ts        # Métodos Axios puros
│       │   └── useFilmes.ts         # Custom Hooks React Query (queries e mutations)
│       ├── components/
│       │   ├── FilmeCard.tsx        # Card estilizado de filme
│       │   ├── FilmeForm.tsx        # Formulário reativo de criação/edição
│       │   ├── EmptyList.tsx        # Feedback visual quando não há registros
│       │   └── LoadingSpinner.tsx   # Indicador de carregamento temático
│       ├── schemas/filme.schema.ts  # Esquema Zod para validação do filme
│       ├── screens/
│       │   ├── FilmeListScreen.tsx  # Tela principal com listagem, busca e FAB
│       │   ├── FilmeDetailScreen.tsx# Detalhes, pôster em destaque, editar e excluir
│       │   └── FilmeFormScreen.tsx  # Tela de cadastro/edição
│       └── types/filme.types.ts     # Interfaces TypeScript de Filme e Respostas
├── navigation/
│   ├── RootNavigator.tsx            # Stack Navigator condicional por autenticação
│   └── types.ts                     # Tipagem estrita de rotas e parâmetros
├── services/api.ts                  # Instância Axios + Gerenciador de Token
└── theme/theme.ts                   # Design Tokens (Cores, Tipografia, Espaçamentos)
```

### 4.2. Fluxo de Autenticação e Navegação Condicional
* A navegação principal (`RootNavigator`) é **reativa ao estado de autenticação**:
  - Se o usuário **não** está logado: Apenas as telas de `Login` e `Register` ficam acessíveis. É impossível acessar as telas de gerenciamento sem autenticação.
  - Se o usuário **está** logado: O Stack carrega as telas de `FilmeList`, `FilmeDetail` e `FilmeForm`, exibindo o botão de "Sair 🚪" no header.
* **Persistência Offline de Sessão:** Ao logar, o token JWT do Sanctum é armazenado no `AsyncStorage`. Quando o app é fechado e reaberto, o token é lido instantaneamente na inicialização, mantendo a sessão ativa sem exigir novo login do usuário.

### 4.3. Gerenciamento de Estado e Cache com React Query (v5)
Diferente de abordagens tradicionais que usam `useEffect` e múltiplos estados locais (`loading`, `error`, `data`), o app utiliza **TanStack React Query**:
* **Cache Inteligente:** Se o usuário navegar da lista para os detalhes e voltar, a lista não precisa ser recarregada da rede; ela é servida instantaneamente da memória.
* **Invalidação Automática:** Ao criar, editar ou excluir um filme, a mutation dispara `queryClient.invalidateQueries({ queryKey: ['filmes'] })`. A lista é revalidada em segundo plano e a interface se atualiza instantaneamente.
* **Pull-to-refresh Nativo:** Integrado diretamente com a flag `refetch` da query.

### 4.4. Validação de Formulários com React Hook Form + Zod
* **Alta Performance:** O `react-hook-form` utiliza refs nativas (uncontrolled inputs), impedindo que a digitação de cada letra cause re-renderização completa da tela.
* **Tipagem Estrita (Type Inference):** O tipo dos dados do formulário (`FilmeFormData`) não é criado manualmente, mas inferido diretamente do esquema Zod (`z.infer<typeof filmeSchema>`).
* **Regras Validadas no App:**
  - Título, gênero e diretor: Obrigatórios.
  - Ano: Deve ser um número inteiro positivo entre 1800 e o ano corrente + 10.
  - Duração: Número inteiro maior que zero.
  - Data de Lançamento: Formato de data válido.

### 4.5. Seleção e Envio de Fotos (Upload Mobile)
* Integrado com `expo-image-picker` com permissões automáticas para a galeria de mídia.
* Construção de payload nativo com `FormData` contendo `uri`, `name` e `type` (MIME type).
* Compatibilidade multiplataforma: tratamento de prefixos `file://` no iOS e Android.

---

## 🔄 5. Passo a Passo do Fluxo de Execução ("Como Funciona")

### Cenário 1: Primeiro Acesso do Usuário
1. O usuário abre o app no celular (Expo Go).
2. O `AuthContext` verifica o `AsyncStorage`; como não há token, renderiza a tela de **Login**.
3. O usuário toca em "Criar Conta", preenche nome, e-mail e senha.
4. O app dispara `POST /api/register`. O backend valida, gera o hash da senha via `bcrypt`, emite o token Sanctum e responde com `201 Created`.
5. O app salva o token no `AsyncStorage`, injeta o cabeçalho `Authorization: Bearer <token>` no cliente Axios e transiciona automaticamente para o catálogo de filmes.

### Cenário 2: Visualização e Busca de Filmes
1. A tela `FilmeListScreen` monta e aciona o hook `useFilmes()`.
2. O React Query faz a chamada `GET /api/filmes`.
3. Os cards dos filmes são renderizados com título, gênero, ano, duração e pôster.
4. Ao digitar no campo de busca (ex: "Matrix"), um filtro local em tempo real atua instantaneamente sobre o título, gênero ou diretor, sem sobrecarregar o servidor com requisições desnecessárias.

### Cenário 3: Cadastro de um Novo Filme com Imagem
1. O usuário clica no botão flutuante `+` (FAB).
2. Toca no seletor de pôster; o `expo-image-picker` abre a galeria do celular.
3. O usuário preenche os campos do filme. O Zod valida as regras em tempo real ao submeter.
4. O app monta um `FormData` com os dados textuais e o arquivo binário da imagem, disparando `POST /api/filmes`.
5. O backend salva a foto na pasta `storage/app/public/filmes/`, grava o registro no banco e responde `201 Created`.
6. A mutation do React Query invalida a chave `['filmes']`, a lista é atualizada e a tela fecha voltando para o catálogo.

### Cenário 4: Exclusão com Diálogo de Confirmação
1. Na tela de detalhes, o usuário toca em "Excluir Filme".
2. Um alerta nativo (`Alert.alert`) solicita confirmação: *"Tem certeza que deseja remover este filme?"*.
3. Ao confirmar, o app executa `DELETE /api/filmes/{id}`.
4. O backend apaga o arquivo físico da imagem e remove a linha da tabela.
5. O React Query atualiza o cache e o app redireciona de volta à listagem.

---

## 🎤 6. Roteiro Sugerido para Apresentar ao Professor (5 a 10 Minutos)

Se você tiver que falar na frente do professor ou da turma, siga este roteiro estruturado:

### Minuto 1: Abertura e Proposta
> *"Bom dia/Boa tarde, professor. O projeto desenvolvido para a disciplina de PDM é um sistema completo de gerenciamento e catálogo de filmes. Optamos por uma arquitetura Monorepo, contendo tanto o Backend da API quanto o aplicativo Mobile no mesmo ecossistema, porém com responsabilidades estritamente desacopladas."*

### Minutos 2 a 3: Arquitetura do Backend
> *"No Backend, desenvolvemos uma API RESTful em PHP 8 e Laravel, estruturada dentro de containers Docker. Implementamos autenticação segura via Laravel Sanctum com Bearer Tokens. A API conta com recursos completos de CRUD, validação de requisições, limpeza de arquivos físicos de imagem no servidor quando um filme é editado ou excluído, e uma suíte de testes automatizados com PHPUnit. Além disso, a API está hospedada e ativa na nuvem no Render."*

### Minutos 3 a 5: Demonstração Prática do App Mobile
*(Neste momento, espelhe ou mostre o celular rodando no Expo Go)*
1. **Mostrar o Login e Cadastro:** Mostre a tela de autenticação e a persistência com `AsyncStorage`.
2. **Mostrar a Lista de Filmes:** Mostre a rolagem, a busca em tempo real por gênero ou título e o gesto de *Pull-to-refresh*.
3. **Mostrar a Tela de Detalhes:** Clique em um filme, mostre o pôster ampliado, metadados e botões de ação.
4. **Cadastrar um Filme Novo:** Clique no `+`, selecione uma foto real da galeria do seu celular, preencha dados e salve. Mostre ele aparecendo imediatamente na lista graças à invalidação de cache do React Query!
5. **Editar e Excluir:** Edite um campo e depois exclua um filme mostrando o diálogo de confirmação.

### Minutos 5 a 7: Destaques Técnicos do Frontend
> *"No Frontend Mobile, utilizamos React Native com Expo e TypeScript. Destaco a adoção do padrão arquitetural Feature-Based, dividindo o app em módulos de autenticação e filmes. Para gerenciar os dados do servidor, adotamos o React Query v5, que nos dá cache automático, revalidação em segundo plano e elimina a necessidade de controle manual de loading com `useEffect`. Para os formulários, combinamos React Hook Form com esquemas Zod, o que garante máxima performance de renderização e validação estrita com TypeScript de ponta a ponta."*

### Minuto 8: Conclusão
> *"O projeto atende a todos os requisitos solicitados: CRUD completo, upload de fotos, persistência, interface visual com tema Dark Cinema de alto contraste, e bibliotecas modernas recomendadas pela indústria. Estou à disposição para tirar qualquer dúvida ou mostrar qualquer parte do código-fonte."*

---

## ❓ 7. Perguntas Prováveis do Professor & Como Responder

Aqui estão as perguntas mais comuns que professores fazem em defesas de projeto e a resposta ideal:

### 1. "Por que vocês escolheram o React Query ao invés de usar apenas o Redux ou useState com useEffect?"
**Resposta Ideal:**
> *"O React Query é especializado no gerenciamento de **Server State** (estado vindo do servidor). O `useState` com `useEffect` exige escrever manualmente lógicas complexas de controle de loading, tratamento de erros, cancelamento de requisições e sincronização de cache. O React Query já resolve isso de forma declarativa, oferecendo cache automático na memória, revalidação em segundo plano e pull-to-refresh nativo, reduzindo centenas de linhas de código boilerplate."*

### 2. "Como funciona o upload da foto entre o celular e o backend?"
**Resposta Ideal:**
> *"No celular, usamos o `expo-image-picker` para selecionar a foto da galeria. Ele nos retorna uma URI local. Nós construímos um objeto `FormData` com essa URI, o nome do arquivo e o MIME type correspondente, enviando a requisição com o cabeçalho `multipart/form-data`. No Laravel, o `FilmeController` valida a imagem, armazena no disco `public` usando um hash único e salva o caminho no banco. O `FilmeResource` então gera a URL absoluta que o app usa para renderizar a imagem."*

### 3. "Por que na atualização (update) do filme vocês usam `_method = PUT` em uma requisição `POST`?"
**Resposta Ideal:**
> *"Por uma limitação do protocolo HTTP nativo no interpretador do PHP: o PHP não popula a variável superglobal `$_FILES` nem faz o parse de payloads `multipart/form-data` quando o método HTTP é `PUT` ou `PATCH`. Para contornar isso com o padrão recomendado pela própria documentação do Laravel, fazemos o envio como `POST` com um campo `_method: PUT`, permitindo atualizar dados e enviar arquivos binários na mesma requisição de forma transparente."*

### 4. "Como foi implementada a segurança e autenticação das rotas?"
**Resposta Ideal:**
> *"Usamos o **Laravel Sanctum**. Quando o usuário faz login com e-mail e senha, o backend valida com `Hash::check` e gera um Bearer Token gravado em banco. Esse token é enviado ao app e armazenado de forma segura no `AsyncStorage`. Todas as requisições subsequentes para endpoints protegidos (como criar, editar e excluir filmes) incluem esse token no cabeçalho `Authorization: Bearer <token>`. Se o token for inválido ou expirar, a API retorna `401 Unauthorized` e o app redireciona para o login."*

### 5. "O que é a arquitetura Feature-Based que vocês usaram no app?"
**Resposta Ideal:**
> *"Em vez de organizar o projeto pelo tipo de arquivo técnico (uma pasta gigante com todas as telas, outra com todos os componentes), organizamos o projeto pelo domínio do negócio: temos a pasta `features/auth` e a pasta `features/filmes`. Cada uma contém seus próprios componentes, telas, esquemas Zod e chamadas de API. Isso torna o código modular, escalável e de fácil manutenção caso o sistema cresça com novas funcionalidades."*

### 6. "Como foram feitos os testes da aplicação?"
**Resposta Ideal:**
> *"No backend, criamos testes de integração automatizados usando PHPUnit (`FilmeTest.php`). Utilizamos a trait `RefreshDatabase` para garantir isolamento entre os testes. Testamos cenários de listagem, criação com e sem upload de fotos simuladas (`UploadedFile::fake()`), validação de campos ausentes, atualização e remoção de registros com verificação de status codes HTTP."*

---

## 📊 8. Tabela Resumo das Tecnologias

| Área | Tecnologia | Versão | Função Principal |
| :--- | :--- | :--- | :--- |
| **Backend** | PHP | 8.3 / 8.4 | Linguagem base da API |
| **Backend** | Laravel | 11 / 13 | Framework Web RESTful |
| **Backend** | Sanctum | 4.0 | Autenticação com Bearer Tokens |
| **Backend** | PHPUnit | 12.x | Suíte de testes automatizados |
| **Backend** | SQLite / Postgres | - | Bancos de dados relacional |
| **Mobile** | React Native | 0.88 | Framework mobile multiplataforma |
| **Mobile** | Expo | SDK 58 | Plataforma e ecossistema mobile |
| **Mobile** | TypeScript | 6.0 | Tipagem estática e segurança de código |
| **Mobile** | React Query | v5 | Cache e gerenciamento de estado assíncrono |
| **Mobile** | React Hook Form | v7 | Gestão de formulários performática |
| **Mobile** | Zod | v4 | Validação de esquemas e inferência de tipos |
| **Mobile** | Axios | v1 | Cliente HTTP para chamadas REST |
| **Mobile** | React Navigation | v7 | Gerenciamento de rotas e fluxo de navegação |
| **Mobile** | AsyncStorage | 2.2 | Persistência local da sessão do usuário |
| **Mobile** | Image Picker | SDK 58 | Seleção de fotos da galeria do celular |
| **Infra** | Docker | - | Padronização de ambiente de desenvolvimento |
| **Infra** | Render Cloud | - | Hospedagem da API na nuvem |
