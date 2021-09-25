FROM node:16.10-alpine

WORKDIR /ceres-client

ENV PATH="./node_modules/.bin:$PATH"

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]