api-image:
	docker build -f ./api/Dockerfile -t finpoq_api . --no-cache

api-image-prod:
	docker build -f ./api/Dockerfile.prod -t mauvies/finpoq_api .

frontend-image:
	docker build -f ./api/Dockerfile -t finpoq_api .

frontend-image-prod:
	docker build -f ./frontend/Dockerfile.prod -t mauvies/finpoq_frontend .

compose-dev:
	docker-compose -f docker-compose.yml up --build

compose-prod:
	docker-compose -f docker-compose.prod.yml up

SSH_STRING:=root@207.154.239.240
BACKEND_PORTS:=5000:5000

ssh:
	ssh ${SSH_STRING}

cp-docker-compose:
	scp -r docker-compose.prod.yml ${SSH_STRING}:/root/devops/

dev-frontend:
	docker build -f ./api/Dockerfile -t finpoq_api . && docker run -d --env-file ./api/.env -p ${BACKEND_PORTS} finpoq_api && cd frontend && npm run dev
