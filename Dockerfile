FROM node:22.13.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 8080

ENV URL_MONGO=mongodb+srv://gemini2393:KoQXDs07qLQOeHo4@e-commerce.dkxb7.mongodb.net/

CMD [ "npm", "start"]