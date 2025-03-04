# Используем официальный образ Node.js 18
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости (учитываем peer dependencies)
RUN npm install --legacy-peer-deps

# Копируем весь код проекта
COPY . .

# Собираем проект перед запуском
RUN npm run build

# Экспонируем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем Nuxt сервер в production-режиме
CMD ["npx", "nuxt", "dev"]