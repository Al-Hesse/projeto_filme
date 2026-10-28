# 📋 Relatório de Desenvolvimento - PDM (Trabalho Prático)
**Data de Atualização:** 15 de Outubro de 2026  
**Disciplina:** Programação para Dispositivos Móveis (PDM)  
**Objetivo:** Documento interno de handover e registro de estado para continuidade futura do projeto.

---

## 📌 1. Visão Geral do Projeto

O projeto é composto por duas aplicações integradas que formam um sistema completo de **Catálogo e Gerenciamento de Filmes**:

1. **`projeto_filme/` (Backend):** API RESTful desenvolvida em **PHP / Laravel** rodando via **Docker** (porta `8088`).
2. **`projeto_filme_app/` (Frontend Mobile):** Aplicativo mobile desenvolvido em **Expo (React Native)** com TypeScript, estruturado no padrão **Features**.

---

## 🚀 2. Status das Entregas

### ✅ Entrega 1 (Backend - Concluída)
- [x] API RESTful completa de Filmes com rotas: `GET /api/filmes`, `GET /api/filmes/{id}`, `POST /api/filmes`, `PUT /api/filmes/{id}`, `DELETE /api/filmes/{id}`.
- [x] Modelo `Filme` com 8 atributos: `id`, `titulo`, `genero`, `diretor`, `ano`, `duracao_em_minutos`, `data_de_lancamento`, `foto`.
- [x] Suporte a upload de fotos com armazenamento em `storage/app/public/filmes/` e URLs absolutas.
- [x] Suporte a URLs externas de pôsteres (ex: Unsplash).
- [x] Ambiente encapsulado via Docker (`docker-compose.yml` mapeando porta `8088:8000`).
- [x] Suíte de testes automatizados com PHPUnit.
- [x] Seeder com 10 filmes fictícios e pôsteres temáticos em alta resolução.

### ✅ Entrega 2 (Mobile App - Concluída)
- [x] Aplicação Expo configurada com TypeScript.
- [x] **CRUD Completo:**
  - **Listagem (Read):** Catálogo de filmes com busca em tempo real (título, gênero, diretor) e Pull-to-refresh.
  - **Detalhes (Read):** Visualização completa do pôster, metadados e botões de ação.
  - **Cadastro (Create):** Formulário com validação Zod e seletor de fotos (`expo-image-picker`).
  - **Edição (Update):** Formulário pré-preenchido com substituição/remoção de pôster.
  - **Exclusão (Delete):** Ação com diálogo de confirmação e invalidação de cache.
- [x] **Bibliotecas Obrigatórias Integradas:**
  - `react-hook-form` (v7)
  - `zod` (v4)
  - `@hookform/resolvers`
  - `axios` (v1)
  - `@tanstack/react-query` (v5)
- [x] **Arquitetura por Features:** Organizada na pasta `src/features/filmes/`.
- [x] **Identidade Visual (Dark Cinema):** Fundo cinza bem escuro (`#121214`), cards em Vermelho Sangue / Vinho profundo (`#5C0916`), bordas contrastantes (`#8B1428`) e textos brancos de alto contraste.
- [x] **Tipagem TypeScript:** 100% validada (`npx tsc --noEmit` com 0 erros).

---

## 📁 3. Estrutura do Código

```text
PDM/
├── RELATORIO_DESENVOLVIMENTO.md                   # Este relatório (ignorado no git)
│
├── projeto_filme/                                 # BACKEND LARAVEL
│   ├── app/
│   │   ├── Http/Controllers/FilmeController.php  # Métodos do CRUD e validação
│   │   ├── Http/Resources/FilmeResource.php       # Formatação JSON e URLs de fotos
│   │   └── Models/Filme.php                       # Model Eloquent
│   ├── database/
│   │   ├── migrations/                            # Tabela 'filmes'
│   │   └── seeders/FilmeSeeder.php                # 10 filmes fictícios com pôsteres
│   ├── routes/api.php                             # Route::apiResource('filmes', ...)
│   ├── docker-compose.yml                         # Container Docker na porta 8088
│   └── README.md                                  # Documentação da API e guia Expo Go
│
└── projeto_filme_app/                             # FRONTEND EXPO
    ├── App.tsx                                    # QueryClientProvider + NavigationContainer
    ├── src/
    │   ├── features/
    │   │   └── filmes/
    │   │       ├── api/
    │   │       │   ├── filmes.api.ts              # Chamadas Axios (GET, POST, PUT, DELETE)
    │   │       │   └── useFilmes.ts               # Hooks React Query (useFilmes, mutations)
    │   │       ├── components/
    │   │       │   ├── FilmeCard.tsx              # Card estilizado da lista
    │   │       │   ├── FilmeForm.tsx              # Form com React Hook Form + Zod + Picker
    │   │       │   ├── EmptyList.tsx              # Componente de lista vazia
    │   │       │   └── LoadingSpinner.tsx         # Indicador de carregamento
    │   │       ├── schemas/
    │   │       │   └── filme.schema.ts            # Schema Zod para validação
    │   │       ├── screens/
    │   │       │   ├── FilmeListScreen.tsx        # Tela inicial (lista, busca, FAB)
    │   │       │   ├── FilmeDetailScreen.tsx      # Tela de detalhes, editar, excluir
    │   │       │   └── FilmeFormScreen.tsx        # Tela de criação/edição
    │   │       └── types/
    │   │           └── filme.types.ts             # Tipos TypeScript
    │   ├── navigation/
    │   │   ├── RootNavigator.tsx                  # Stack Navigator nativo
    │   │   └── types.ts                           # Tipagem das rotas
    │   ├── services/
    │   │   └── api.ts                             # Instância Axios (IP local / 8088)
    │   └── theme/
    │       └── theme.ts                           # Tokens visuais (Dark/Vinho)
    └── README.md                                  # Documentação completa do app
```

---

## ⚙️ 4. Guia Rápido de Comandos para Desenvolvimento

### Iniciar o Backend:
```bash
cd projeto_filme
docker compose up -d
```
* **Testar API:** `curl http://localhost:8088/api/filmes`
* **Repopular o banco:** `docker compose exec api php artisan db:seed --class=FilmeSeeder`
* **Rodar testes:** `docker compose exec api php artisan test`

### Iniciar o Frontend:
```bash
cd projeto_filme_app
npx expo start
```
* **Escanear no celular:** Abrir o app **Expo Go** e escanear o QR Code gerado.
* **Checar tipagem:** `npx tsc --noEmit`

---

## 🧭 5. Onde Paramos / Próximos Passos Futuros

1. **Estado Atual:**
   * Ambas as partes da Entrega 2 estão 100% funcionais, testadas e documentadas.
   * O repositório `projeto_filme` está atualizado no GitHub (`https://github.com/Al-Hesse/projeto_filme`).
   * O repositório `projeto_filme_app` está commitado localmente na branch `main`, pronto para push quando o repositório remoto for criado.

2. **Possíveis Etapas Futuras (Caso haja Entrega 3 / Novas Features):**
   * Autenticação de usuários (JWT / Laravel Sanctum no backend e tela de Login no App).
   * Filtro avançado por categorias/gêneros na listagem.
   * Paginação infinita (`useInfiniteQuery` no React Query) caso o catálogo cresça.
   * Modo offline ou persistência de cache local (AsyncStorage / React Query Persist).
