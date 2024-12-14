FROM node:22

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate dev && npm run dev"]