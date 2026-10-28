FROM php:8.4-cli

# Instalar dependências de sistema e extensões do PHP para Laravel
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libxml2-dev \
    libzip-dev \
    unzip \
    git \
    zip \
    curl \
    && docker-php-ext-install pdo pdo_sqlite bcmath

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Criar .env temporário para o artisan package:discover
RUN cp -n .env.example .env

# Instalar dependências do Composer sem pacotes de desenvolvimento
RUN composer install --no-dev --optimize-autoloader

# Configurar permissões de armazenamento
RUN chmod -R 777 storage bootstrap/cache

# Porta exposta pelo Render
EXPOSE 8080

# Script de inicialização
CMD sh -c "touch database/database.sqlite && \
    php artisan key:generate --force && \
    php artisan migrate --force && \
    php artisan db:seed --class=FilmeSeeder --force && \
    php artisan serve --host=0.0.0.0 --port=\${PORT:-8080}"
