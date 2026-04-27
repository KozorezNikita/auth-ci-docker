# базовий node образ
FROM node:20

# робоча папка в контейнері
WORKDIR /app

# копіюємо package.json
COPY package*.json ./

# встановлюємо залежності
RUN npm install

# копіюємо весь код
COPY . .

# Prisma generate (важливо)
RUN npx prisma generate

# білд (якщо є ts)
RUN npm run build

# порт
EXPOSE 5000

# старт
CMD ["node", "dist/index.js"]