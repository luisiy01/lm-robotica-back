FROM node:22.20.0-alpine3.21

ENV APP_PORT=3000
ENV NODE_ENV=prod
ENV MONGODB=mongodb+srv://luisiy0-user:NgBVn98W0lbpQ1Nx@mongodbcluster.wm0mle9.mongodb.net/
ENV WORKDIR_APP=/var/prod

WORKDIR ${WORKDIR_APP}
COPY package.json .
RUN yarn install
COPY . .

RUN yarn start

EXPOSE ${APP_PORT}

CMD ["bash", "run.sh"]