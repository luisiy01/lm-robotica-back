FROM node:20.14.0-bullseye

ENV APP_PORT=3000
ENV NODE_ENV=prod
ENV WORKDIR_APP=/var/prod

WORKDIR ${WORKDIR_APP}
COPY package.json .
RUN yarn install
COPY . .

RUN yarn start

EXPOSE ${APP_PORT}

CMD ["bash", "run.sh"]