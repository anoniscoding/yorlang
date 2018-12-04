
FROM node:8.9.4

RUN mkdir /src
WORKDIR /src
COPY . /src

RUN npm install -g jest@23.6.0

RUN npm run link