FROM node:8

COPY ./frontend .

RUN npm install
RUN npm run build

CMD npm run start

EXPOSE 3000
