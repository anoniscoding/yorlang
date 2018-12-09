
FROM node:8.9.4

WORKDIR /src

COPY . /src

RUN npm install

RUN npm run link
