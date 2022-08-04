api-image:
	docker build -f ./api/Dockerfile -t mauvies/finpoq_api . --no-cache

api-image-prod:
	docker build -f ./api/Dockerfile.prod -t mauvies/finpoq_api . --no-cache

frontend-image:
	docker build -f ./frontend/Dockerfile -t mauvies/finpoq_frontend . --no-cache

frontend-image-prod:
	docker build -f ./frontend/Dockerfile.prod -t mauvies/finpoq_frontend .

compose-dev:
	docker-compose -f docker-compose.yml up --build

compose-prod:
	docker-compose -f docker-compose.prod.yml up --build

run-dev:
	cd frontend && npm run dev &
	cd api && npm run dev

run-prod:
	cd frontend && npm run serve &
	cd api && node dist/index.js

