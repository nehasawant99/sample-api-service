FROM node:20-alpine

WORKDIR /app

COPY package*.json .npmrc ./

ARG GITHUB_PAT
ENV GITHUB_PAT=$GITHUB_PAT

RUN npm ci --only=production
RUN rm -f .npmrc

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]