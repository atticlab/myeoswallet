FROM node:carbon

ENV HOME "/server"

WORKDIR ${HOME}

COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
