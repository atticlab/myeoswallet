FROM node:carbon

ENV HOME "/src"

WORKDIR ${HOME}

COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
