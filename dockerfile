FROM node:alpine

WORKDIR /usr/src/app

COPY tower-visualization/package*json ./

RUN npm install -g @angular/cli

RUN npm install

COPY tower-visualization/ .

CMD ["ng", "serve", "--host", "0.0.0.0"]
