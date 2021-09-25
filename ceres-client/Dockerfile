FROM node:16.10-alpine

WORKDIR /ceres-client

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

CMD ["npm", "start"]