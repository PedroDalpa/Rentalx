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

**Requisitos Funcionais(RF)**

**Requisitos não Funcionais(RNF)**

**Regra de negócio(RN)**

# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com um placa já existente.
O carro deve ser cadastro como disponível por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagem do carro

**RF**
Deve ser possível cadastrar as imagens do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar uma ou mais imagens para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração minima de 24h.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve esta logado
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível