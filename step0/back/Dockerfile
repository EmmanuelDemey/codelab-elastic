FROM node:9-alpine

ENV PORT 8080

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY app ./app

EXPOSE 8080

CMD [ "npm", "start" ]