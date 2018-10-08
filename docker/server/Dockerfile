FROM node:carbon

ENV HOME "/src/server"

WORKDIR ${HOME}

COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
