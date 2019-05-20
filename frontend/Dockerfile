FROM node:8

COPY ./frontend .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD npm run start
