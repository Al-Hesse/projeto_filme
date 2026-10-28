FROM php:8.2-cli

# Instalar dependências de sistema e extensão do SQLite
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    unzip \
    git \
    zip \
    && docker-php-ext-install pdo pdo_sqlite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Instalar dependências do Composer sem dependências de dev
RUN composer install --no-dev --optimize-autoloader

# Configurar permissões de armazenamento
RUN chmod -R 777 storage bootstrap/cache

# Porta exposta pelo Render
EXPOSE 8080

# Script de inicialização: cria o banco SQLite, roda as migrations e o seeder, e inicia o servidor
CMD sh -c "cp -n .env.example .env && \
    touch database/database.sqlite && \
    php artisan key:generate --force && \
    php artisan migrate --force && \
    php artisan db:seed --class=FilmeSeeder --force && \
    php artisan serve --host=0.0.0.0 --port=\${PORT:-8080}"
