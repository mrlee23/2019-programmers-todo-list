# Todo List #

- [Demo](https://todolist.dongsoolee.com)
- [GitHub](https://github.com/mrlee23/2019-programmers-todo-list)

# 실행환경 구성 #

## Docker 설치 ##

```sh
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum install docker-ce
```

## Docker-compose 설치 ##

```sh
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ docker-compose --version
```

# 초기 설정 및 실행 방법 #

> Docker(18.09), Docker Compose(1.22) 환경에서 테스트하였습니다.

## 초기 설정 ##

### DB 계정 생성을 위한 .env 파일 생성 ###

```
DB_ROOT_PASSWORD=rootpassword
DB_USER=db_username
DB_PASSWORD=db_password_1234
DB_DB=dbname
```

### BACKEND_API 설정 ###

frontend에서 backend에 접근을 하기 위해 **BACKEND_API** 변수를 직접 설정해야 한다.

frontend/nuxt.config.js
```js
const BACKEND_API = 'https://todolist.dongsoolee.com/api/';
```

## 실행 ##

```sh
$ docker-compose up --build -d
```

## 실행 확인 ##

```sh
$ docker-compose logs -f
```
