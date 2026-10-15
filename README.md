# Cadastro de Filmes - Backend API (Laravel)

Este repositório contém o backend desenvolvido em Laravel para a disciplina de **Programação para Dispositivos Móveis (PDM)**.

O projeto consiste em uma **API REST completa (CRUD)** para o cadastro de filmes, integrada e consumida pelo aplicativo móvel desenvolvido em **Expo (React Native)** na **Entrega 2**.

---

## 🚀 Como Executar o Projeto

A forma mais prática e rápida de executar o projeto, sem precisar instalar PHP, Composer ou SQLite em sua máquina local, é utilizando o **Docker**.

### 1. Iniciar o Servidor
Certifique-se de que o Docker está instalado e execute o comando abaixo no terminal da raiz do projeto:

```bash
docker compose up -d
```

Este comando irá baixar e executar o contêiner em segundo plano. A API estará disponível em:
👉 **`http://localhost:8088`**

### 2. Popular o Banco com Dados Iniciais (Opcional)
Para popular o banco com filmes fictícios e pôsteres temáticos:

```bash
docker compose exec api php artisan db:seed --class=FilmeSeeder
```

---

## 📡 Endpoints da API (CRUD de Filmes)

Todos os endpoints retornam e aceitam respostas em formato **JSON**.

| Método | Endpoint | Descrição | Parâmetros / Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/filmes` | Listar todos os filmes | Nenhum (retorna lista ordenada do mais recente para o mais antigo) |
| **GET** | `/api/filmes/{id}` | Consultar filme por ID | `{id}` na URL |
| **POST** | `/api/filmes` | Cadastrar novo filme | JSON ou Multipart Form (campos obrigatórios) |
| **PUT/PATCH** | `/api/filmes/{id}` | Atualizar dados do filme | JSON (Campos parciais) ou POST com `_method=PUT` se enviar foto |
| **DELETE** | `/api/filmes/{id}` | Excluir filme | `{id}` na URL (exclui o filme e sua foto física) |

### Atributos do Filme
Cada filme possui **8 atributos** (atendendo ao mínimo de 7 exigido), englobando números, strings, datas e fotos:

1. `id` (Número autoincremento, gerado pelo banco)
2. `titulo` (String) - Título do filme
3. `genero` (String) - Gênero (Ex: Ficção Científica, Suspense, Ação, Drama, Terror...)
4. `diretor` (String) - Nome do diretor do filme
5. `ano` (Número) - Ano de lançamento (Ex: 2024)
6. `duracao_em_minutos` (Número) - Duração (Ex: 142)
7. `data_de_lancamento` (Data) - Data no formato `YYYY-MM-DD`
8. `foto` (Foto / URL) - Arquivo de imagem enviado por upload ou URL do pôster

---

## 📱 Integração com o Aplicativo Móvel (Expo / Expo Go / React Native)

A API foi projetada para ser consumida pela aplicação mobile desenvolvida com **Expo** e executada via **Expo Go** na **Entrega 2**:

1. **CORS Habilitado (`Access-Control-Allow-Origin: *`):** Permite o consumo transparente sem bloqueios de política de mesma origem tanto no emulador quanto no aplicativo **Expo Go** em smartphones físicos na mesma rede Wi-Fi.
2. **URLs Absolutas de Imagens:** A API retorna a URL completa e acessível para renderização direta em componentes `<Image source={{ uri: filme.foto }} />`.
3. **Execução no Expo Go:** O frontend mobile conecta-se a esta API utilizando React Hook Form, Zod, Axios, TanStack React Query e arquitetura por Features, permitindo escanear o QR Code no **Expo Go** para testar todo o fluxo de CRUD em tempo real.

---

## 🧪 Como Testar os Endpoints

Você pode testar a API utilizando ferramentas como **Postman**, **Insomnia**, ou diretamente através do terminal usando **curl**:

### 1. Listar Filmes (GET)
```bash
curl -i http://localhost:8088/api/filmes
```

### 2. Consultar por ID (GET)
```bash
curl -i http://localhost:8088/api/filmes/1
```

### 3. Cadastrar Filme (POST)
**Sem foto (JSON):**
```bash
curl -i -X POST -H "Content-Type: application/json" -d '{
  "titulo": "O Enigma do Horizonte Cósmico",
  "genero": "Ficção Científica",
  "diretor": "Valéria Vance",
  "ano": 2024,
  "duracao_em_minutos": 142,
  "data_de_lancamento": "2024-03-15"
}' http://localhost:8088/api/filmes
```

**Com Upload de Foto (Multipart):**
```bash
curl -i -X POST -F "titulo=O Último Samurai Cibernético" -F "genero=Ação" -F "diretor=Kenji Takahashi" -F "ano=2025" -F "duracao_em_minutos=135" -F "data_de_lancamento=2025-07-08" -F "foto=@/caminho/para/imagem.jpg" http://localhost:8088/api/filmes
```

### 4. Atualizar Filme (PUT / PATCH)
**Atualização de campos de texto via JSON:**
```bash
curl -i -X PUT -H "Content-Type: application/json" -d '{
  "titulo": "O Enigma do Horizonte Cósmico - Versão do Diretor"
}' http://localhost:8088/api/filmes/1
```

**Atualização de Foto (Multipart com Method Spoofing):**
```bash
curl -i -X POST -F "_method=PUT" -F "foto=@/caminho/para/nova_imagem.jpg" http://localhost:8088/api/filmes/1
```

### 5. Excluir Filme (DELETE)
```bash
curl -i -X DELETE http://localhost:8088/api/filmes/1
```

---

## 🚥 Testes Automatizados (TDD/PHPUnit)

O projeto possui cobertura de testes para todos os endpoints e regras de validação. Para rodar a suite de testes dentro do contêiner Docker:

```bash
docker compose exec api php artisan test
```

---

## 📁 Estrutura de Entrega

* **`equipe.txt`** - Contém o tema do trabalho e a identificação dos membros da equipe.
