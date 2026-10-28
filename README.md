# 🎬 Catálogo de Filmes - Projeto PDM (Monorepo)

Este repositório contém a solução completa para o trabalho de **Programação para Dispositivos Móveis (PDM)**, estruturado no modelo **Monorepo** (Backend + Mobile App no mesmo repositório).

---

## 📁 Estrutura do Repositório

```text
PDM/
├── README.md               # Este guia de execução
├── RELATORIO_DESENVOLVIMENTO.md # Relatório técnico de desenvolvimento
│
├── projeto_filme/          # BACKEND (API RESTful em PHP / Laravel)
│   ├── app/                # Controllers, Models, Resources
│   ├── database/           # Migrations e Seeders (SQLite)
│   ├── routes/api.php      # Endpoints do CRUD de Filmes
│   └── README.md           # Documentação detalhada da API
│
└── projeto_filme_app/      # FRONTEND (App Mobile em Expo / React Native)
    ├── App.tsx             # Ponto de entrada (Navigation + React Query)
    ├── src/                # Telas, Componentes, Hooks e Schemas (Zod)
    └── README.md           # Documentação detalhada do aplicativo
```

---

## 🚀 Como Executar o Projeto

Você pode executar o projeto de duas formas: **Sem Docker** (Ideal para os computadores da faculdade sem acesso admin) ou **Com Docker** (Para desenvolvimento local em casa).

---

### 🎓 Opção 1: Rodando na Faculdade (Sem Docker / Sem Admin)

#### 1. Clonar o Repositório
No terminal da faculdade:
```bash
git clone https://github.com/Al-Hesse/projeto_filme.git PDM
cd PDM
```

#### 2. Iniciar o Backend (API Laravel)
Se o computador da faculdade possuir PHP instalado:
```bash
cd projeto_filme

# Copiar o arquivo de ambiente se não existir
cp .env.example .env

# Criar o arquivo do banco de dados SQLite
touch database/database.sqlite

# Executar as migrações e popular com os filmes iniciais
php artisan migrate --seed --class=FilmeSeeder

# Iniciar o servidor da API
php artisan serve --port 8088
```
A API estará rodando em: `http://localhost:8088/api/filmes`

#### 3. Iniciar o Frontend (App Expo Mobile)
Abra **outro terminal** no computador e navegue até a pasta do aplicativo:
```bash
cd PDM/projeto_filme_app

# Instalar as dependências do aplicativo
npm install

# Iniciar o Expo Go
npx expo start
```
* **No celular:** Abra o app **Expo Go** e escaneie o QR Code exibido no terminal.

> 💡 **Dica para Wi-Fi da faculdade:** Se o celular não conectar ao QR Code por restrição de rede Wi-Fi da faculdade, rode o Expo em modo túnel:
> ```bash
> npx expo start --tunnel
> ```

---

### 🏠 Opção 2: Rodando em Casa (Com Docker)

#### 1. Iniciar o Backend via Docker
```bash
cd projeto_filme
docker compose up -d
docker compose exec api php artisan db:seed --class=FilmeSeeder
```

#### 2. Iniciar o App Mobile
```bash
cd projeto_filme_app
npm install
npx expo start
```

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** PHP 8.2, Laravel 11, SQLite, Docker, PHPUnit.
* **Mobile:** React Native, Expo, TypeScript, React Navigation, React Hook Form, Zod, TanStack React Query, Axios.
