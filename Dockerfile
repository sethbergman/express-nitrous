FROM node:8

COPY . /starter
COPY package.json /starter/package.json
COPY .env /starter/.env

WORKDIR /starter

RUN npm install

CMD ["npm","start"]

EXPOSE 3000
