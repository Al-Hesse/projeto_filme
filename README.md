# Cadastro de Filmes - Backend API (Laravel)

Este repositório contém o backend desenvolvido em Laravel para a disciplina de **Programação para Dispositivos Móveis (PDM)**.

O projeto consiste em uma **API REST completa (CRUD)** para o cadastro de filmes, preparada para ser consumida posteriormente por um aplicativo móvel desenvolvido em **Expo (React Native)**.

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
3. `genero` (String) - Gênero (Ex: Ação, Comédia, Drama, Terror...)
4. `diretor` (String) - Nome do diretor do filme
5. `ano` (Número) - Ano de lançamento (Ex: 2014)
6. `duracao_em_minutos` (Número) - Duração (Ex: 169)
7. `data_de_lancamento` (Data) - Data no formato `YYYY-MM-DD`
8. `foto` (Foto) - Arquivo de imagem enviado por upload (armazenado no servidor, retornando a URL pública absoluta)

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
  "titulo": "Interestelar",
  "genero": "Ficção Científica",
  "diretor": "Christopher Nolan",
  "ano": 2014,
  "duracao_em_minutos": 169,
  "data_de_lancamento": "2014-11-06"
}' http://localhost:8088/api/filmes
```

**Com Upload de Foto (Multipart):**
```bash
curl -i -X POST -F "titulo=Matrix" -F "genero=Ficção" -F "diretor=Wachowskis" -F "ano=1999" -F "duracao_em_minutos=136" -F "data_de_lancamento=1999-05-21" -F "foto=@/caminho/para/imagem.jpg" http://localhost:8088/api/filmes
```

### 4. Atualizar Filme (PUT / PATCH)
**Atualização de campos de texto via JSON:**
```bash
curl -i -X PUT -H "Content-Type: application/json" -d '{
  "titulo": "Interestelar - Edição Especial"
}' http://localhost:8088/api/filmes/11
```

**Atualização de Foto (Multipart com Method Spoofing):**
Devido a limitações nativas do PHP em ler requisições `PUT` com multipart/form-data, deve-se enviar um `POST` com o campo `_method=PUT`:
```bash
curl -i -X POST -F "_method=PUT" -F "foto=@/caminho/para/nova_imagem.jpg" http://localhost:8088/api/filmes/11
```

### 5. Excluir Filme (DELETE)
```bash
curl -i -X DELETE http://localhost:8088/api/filmes/11
```

---

## 📱 Preparação para o Expo (React Native)

A API foi configurada com atenção especial aos requisitos de consumo mobile:

1. **CORS Aberto (`Access-Control-Allow-Origin: *`):** Permite que o aplicativo Expo consuma os endpoints sem ser bloqueado pela política de mesma origem do navegador ou simulador.
2. **URLs Absolutas de Imagens:** Em vez de retornar apenas o caminho relativo do arquivo no banco (ex: `filmes/exemplo.jpg`), a API devolve a URL absoluta e acessível (ex: `http://localhost:8088/storage/filmes/exemplo.jpg`). Isso permite a renderização direta em componentes `<Image source={{ uri: filme.foto }} />` do React Native.

---

## 🚥 Testes Automatizados (TDD/PHPUnit)

O projeto possui cobertura de testes para todos os endpoints e regras de validação. Para rodar a suite de testes automatizados dentro do contêiner Docker:

```bash
docker compose exec api php artisan test
```

---

## 📁 Estrutura de Entrega

O arquivo exigido com os dados de entrega encontra-se na raiz do projeto:
* **`equipe.txt`** - Contém o tema do trabalho e o espaço para identificação dos membros da equipe.
