# 🎬 Catálogo de Filmes - Projeto PDM (Monorepo)

Este repositório contém a solução completa para o trabalho da disciplina de **Programação para Dispositivos Móveis (PDM)**, estruturado no modelo **Monorepo** (Backend + Mobile App no mesmo repositório).

* **🌐 API em Produção (Render):** `https://projeto-filme-o03c.onrender.com/api/filmes`
* **📱 Aplicativo Mobile:** React Native com Expo Go (TypeScript, React Query, React Hook Form, Zod)

---

## 📁 Estrutura do Repositório

```text
PDM/
├── README.md                    # Este guia de execução e documentação
├── RELATORIO_DESENVOLVIMENTO.md      # Relatório técnico de desenvolvimento
│
├── projeto_filme/               # BACKEND (API RESTful em PHP 8.4 / Laravel)
│   ├── app/                     # Controllers, Models, Resources
│   ├── database/                # Migrations e Seeders (SQLite)
│   ├── routes/api.php           # Endpoints do CRUD de Filmes
│   ├── Dockerfile               # Configuração de deploy para Render
│   └── README.md                # Documentação detalhada da API
│
└── projeto_filme_app/           # FRONTEND (App Mobile em Expo / React Native)
    ├── App.tsx                  # Ponto de entrada (Navigation + React Query)
    ├── src/                     # Telas, Componentes, Hooks e Schemas (Zod)
    └── README.md                # Documentação detalhada do aplicativo
```

---

## 🚀 Como Executar o Projeto na Faculdade (Sem Docker / Sem Admin)

Como a API já está hospedada e rodando 24/7 na nuvem (Render), **você não precisa de Docker nem de PHP no computador da faculdade**!

### Passo a Passo Rápido:

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/Al-Hesse/projeto_filme.git PDM
   cd PDM/projeto_filme_app
   ```

2. **Instalar Dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o App no Expo Go:**
   ```bash
   npx expo start
   ```

4. **Testar no Celular:**
   Abra o aplicativo **Expo Go** no celular e escaneie o QR Code exibido no terminal. O app carregará todos os filmes consumindo diretamente a API na nuvem!

---

## 💻 Desenvolvimento Local em Casa (Opcional)

Se quiser rodar o backend localmente no seu computador de casa:

### Opção 1: Via Docker
```bash
cd projeto_filme
docker compose up -d
docker compose exec api php artisan db:seed --class=FilmeSeeder
```

### Opção 2: Servidor PHP Nátivo
```bash
cd projeto_filme
cp .env.example .env
touch database/database.sqlite
php artisan migrate --seed --class=FilmeSeeder
php artisan serve --port 8088
```

---

## 🛠️ Tecnologias Utilizadas

* **Backend & Infraestrutura:** PHP 8.4, Laravel 11, SQLite, Docker, Render, PHPUnit (TDD).
* **Mobile & Frontend:** React Native, Expo, TypeScript, React Navigation, React Hook Form, Zod, TanStack React Query v5, Axios.
