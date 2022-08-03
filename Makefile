build:
	docker build -t finpo .

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

