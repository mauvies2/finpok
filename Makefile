build:
	docker build -t finpo .

up-dev:
	docker-compose -f docker-compose.yml up --build

run-compose-dev:
	cd frontend && npm run dev &
	cd api && npm run dev

run-compose-prod:
	cd frontend && npm run serve &
	cd api && node dist/index.js

