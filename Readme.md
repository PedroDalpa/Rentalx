Docker commands

docker rm container_ID to remove container
docker stop container_ID to stop container
docker ps to show run containers 
docker ps -a to show all containers
docker-compose up to run app in docker after config files
docker-compose up -d to run container in second plan
docker logs container_ID -f
docker exec -it container_ID /bin/bash you can access the container terminal 


1 - Teste unitários 
Não testa banco de dados ou api's externas 
E sim a regra de negocio

2 - Testes de integração
-> routes -> controller -> useCases -> Repository
<- repository <- useCases <- controller <- routes

TDD - Test Driver Development 