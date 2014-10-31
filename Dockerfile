FROM debian:latest

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -y nodejs build-essential && apt-get clean
RUN npm install -g grunt-cli bower

# Define working directory.
ADD . /code
WORKDIR /code

RUN npm install
RUN bower --allow-root install

# Define default command.
CMD ["grunt", "serve"]
