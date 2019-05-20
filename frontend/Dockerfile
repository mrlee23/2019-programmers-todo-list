FROM node:8

WORKDIR /usr/src/app

COPY ./frontend .

RUN npm install
RUN npm run build

CMD npm run start

EXPOSE 3000
