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

RUN chown -R node:node /usr/src/app

# Собираем проект перед запуском
RUN npm run build

# Проверяем, что сборка создала необходимые файлы
RUN ls -la .output/

# Экспонируем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем Nuxt сервер в production-режиме
CMD ["node", ".output/server/index.mjs"]