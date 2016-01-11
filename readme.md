# CMS Ipiranga Revenda

## Instalación

# Backend

```bash
composer install
```

```bash
composer dump-autoload
```

```bash
cp .env.ezample .env
```

```bash
php artisan key:generate
```

Despues, se abre el archivo .env para modificar las configuraciones de base de datos, los parametros a configurar son:

```bash
DB_HOST=localhost
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

En ese mismo archivo, en la parte final, agregar dos configuraciones mas:

```bash
ADMIN_USERNAME=anyusername
ADMIN_PASSWORD=anypassword
```

Este sera el usuario con el que se podra acceder al sistema.

Despues, para generar la base de datos

```bash
php artisan migrate
```

```bash
php artisan db:seed --class=AdminUserTableSeeder
```

# Frontend

Para configurar la parte frontend:

```bash
cd public/cms/
```

```bash
bower install
```
