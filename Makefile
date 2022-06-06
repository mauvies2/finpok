build:
	docker build -t finpo .

run-dev:
	docker-compose up --build

run-app:
	cd frontend && npm run dev &
	cd api && npm run dev

