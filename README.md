# Customer App

**Customer App** — это современное веб-приложение с мобильной поддержкой, разработанное с использованием Vue 3, Vite, Capacitor для фронтенда и NestJS с Sequelize для бэкенда. Проект позволяет легко расширять функциональность как на вебе, так и на мобильных устройствах.

---

## 🚀 Технологии

### Фронтенд
- **Vue 3** — современный JavaScript-фреймворк для создания интерфейсов.
- **Vite** — быстрый сборщик и дев-сервер.
- **Capacitor** — добавление мобильной функциональности (Android/iOS).

### Бэкенд
- **NestJS** — прогрессивный Node.js фреймворк.
- **Sequelize** — ORM для работы с базой данных.

- ### Настройка .env

- PORT=5000
- DB_HOST=your_db_host
- DB_PORT=your_db_port
- DB_USERNAME=your_db_username
- DB_PASSWORD=your_db_password
- DB_NAME=your_db_name
- JWT_SECRET=your_jwt_secret

---

## ⚙️ Установка и запуск

### Фронтенд
```bash
cd client          # Перейти в папку фронтенда
npm install        # Установить зависимости
npm run dev        # Запустить в режиме разработки
npm run build      # Собрать проект для продакшена

### Бэкенд
```bash
cd server          # Перейти в папку бэкенда
npm install        # Установить зависимости
npm run start:dev  # Запустить в режиме разработки
npm run build      # Собрать проект для продакшена
