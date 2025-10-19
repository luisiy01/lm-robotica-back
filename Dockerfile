FROM node:22.12.0-alpine3.21

ENV APP_PORT=3000
ENV NODE_ENV=prod
ENV WORKDIR_APP=/var/prod

WORKDIR ${WORKDIR_APP}
COPY package.json .
RUN yarn install
COPY . .

RUN yarn run build

EXPOSE ${APP_PORT}

CMD ["bash", "run.sh"]