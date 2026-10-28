FROM php:8.3-cli

# Instalar dependências de sistema e extensões do PHP para Laravel 11/12
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

# Criar .env temporário para que o artisan package:discover funcione durante o composer install
RUN cp -n .env.example .env

# Instalar dependências do Composer sem pacotes de desenvolvimento
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

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
