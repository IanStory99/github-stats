# Common build stage
FROM node:14.17.0 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm install -g concurrently

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["concurrently", "npm:prisma:migrate", "npm:dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["concurrently", "npm:prisma:migrate", "npm:start"]
