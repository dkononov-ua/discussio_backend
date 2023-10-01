# syntax=docker/dockerfile:1
FROM node:latest
WORKDIR /code
COPY package.json ./
RUN npm install -g @nestjs/cli
EXPOSE 3000
COPY . .
RUN npm install
VOLUME /code/server/Static/filling
VOLUME /code/server/Static/flat
VOLUME /code/server/Static/users
CMD ["npm", "start"]

# WORKDIR /code
# ENV FLASK_APP=app.py
# ENV FLASK_RUN_HOST=0.0.0.0
# RUN apk add --no-cache gcc musl-dev linux-headers
# COPY requirements.txt requirements.txt
# RUN pip install -r requirements.txt
# EXPOSE 5000
# COPY . .
# CMD ["flask", "run"]