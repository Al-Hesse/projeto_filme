# 🎬 Catálogo de Filmes - App Mobile Expo (React Native)

Aplicativo mobile desenvolvido em **Expo (React Native)** com TypeScript para a **Entrega 2** do Trabalho Prático da disciplina de **Programação para Dispositivos Móveis (PDM)**.

O aplicativo consome a API RESTful desenvolvida na primeira etapa (Laravel) e implementa um **CRUD completo de filmes**, estruturado segundo o padrão arquitetural de **Features**.

---

## 📋 Requisitos Atendidos

- [x] **CRUD Completo:** Inserção, consulta (listagem e detalhes), atualização e exclusão de filmes.
- [x] **Bibliotecas Obrigatórias Integradas:**
  - `react-hook-form`
  - `zod`
  - `@hookform/resolvers`
  - `axios`
  - `@tanstack/react-query`
- [x] **Arquitetura por Features:** Organização modular do código dentro de `src/features/filmes/`.
- [x] **Aparência Visual e UX:** Tema Dark Cinema (Fundo cinza escuro `#121214` e cards em Vermelho Sangue / Vinho `#5C0916`), estados de carregamento, lista vazia, pull-to-refresh e seleção de pôster com `expo-image-picker`.

---

## 📁 Estrutura de Pastas (Padrão Features)

```text
src/
├── features/
│   └── filmes/
│       ├── api/
│       │   ├── filmes.api.ts         # Integração HTTP com Axios
│       │   └── useFilmes.ts          # Hooks customizados do React Query (queries & mutations)
│       ├── components/
│       │   ├── FilmeCard.tsx         # Card estilizado de filme para listagem
│       │   ├── FilmeForm.tsx         # Formulário com React Hook Form + Zod + ImagePicker
│       │   ├── EmptyList.tsx         # Componente de feedback para lista vazia
│       │   └── LoadingSpinner.tsx    # Indicador de carregamento
│       ├── schemas/
│       │   └── filme.schema.ts       # Esquemas de validação Zod e tipos inferidos
│       ├── screens/
│       │   ├── FilmeListScreen.tsx   # Tela de catálogo, busca e pull-to-refresh
│       │   ├── FilmeDetailScreen.tsx # Tela de detalhes com ações de editar e excluir
│       │   └── FilmeFormScreen.tsx   # Tela de cadastro e edição de filmes
│       └── types/
│           └── filme.types.ts        # Tipagens e interfaces TypeScript
├── navigation/
│   ├── RootNavigator.tsx             # Configuração do Stack Navigator
│   └── types.ts                      # Tipos das rotas e parâmetros
├── services/
│   └── api.ts                        # Cliente Axios configurado para o backend
└── theme/
    └── theme.ts                      # Tokens de design (cores, espaçamentos, bordas)
```

---

## 🚀 Como Executar o Aplicativo

### 1. Pré-requisitos
Certifique-se de que o backend da API está rodando (via Docker na porta `8088`):
```bash
cd ../projeto_filme
docker compose up -d
```

### 2. Instalar Dependências e Iniciar o Expo
Na pasta do aplicativo (`projeto_filme_app`):

```bash
npm install
npx expo start
```

### 3. Visualizar o App
- **No celular físico:** Abra o app **Expo Go** e escaneie o QR Code exibido no terminal.
- **No emulador Android:** Pressione `a` no terminal.
- **No navegador Web:** Pressione `w` no terminal.

---

## 🧪 Testando as Funcionalidades do CRUD

1. **Consulta / Listagem:**
   - Visualize os cards dos filmes cadastrados na API.
   - Use o campo de busca superior para filtrar por título, gênero ou diretor.
   - Puxe a tela para baixo para disparar o **Pull-to-refresh** sincronizado via React Query.

2. **Cadastro (Create):**
   - Toque no botão flutuante `+` no canto inferior direito.
   - Selecione um pôster da galeria ou preencha os campos obrigatórios.
   - O formulário valida os campos em tempo real usando **Zod** e **React Hook Form**.

3. **Detalhes (Read):**
   - Toque em qualquer card para abrir a tela de detalhes com informações completas e pôster em alta resolução.

4. **Edição (Update):**
   - Na tela de detalhes, toque em **"Editar Filme"**.
   - Altere os dados ou substitua o pôster e toque em **"Salvar Alterações"**.

5. **Exclusão (Delete):**
   - Na tela de detalhes, toque em **"Excluir Filme"**.
   - Confirme no diálogo nativo de alerta. O cache do React Query será invalidado automaticamente e a listagem será atualizada.

---

## 🛠️ Tecnologias Utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [TanStack React Query v5](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
