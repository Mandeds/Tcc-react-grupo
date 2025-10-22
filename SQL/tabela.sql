CREATE TABLE administrador(
id_admin int primary key auto_increment,
email varchar(255),
senha varchar(255),
biografia varchar(500),
telefone int,  
cidade varchar (50), 
ehOng boolean,
foto_perfil varchar(100),
dt_criacao date
);


create table usuario(
id_usuario int primary key auto_increment,
nm_usuario varchar(255),
email varchar(255),
senha varchar(255),
biografia varchar(500),
telefone int,
cidade varchar (50),
ehOng boolean,
foto_perfil varchar(100),
dt_criacao date
);

create table seguidor (
id_seguidor int primary key auto_increment,
id_usuario_seguido int,
id_usuario_seguidor int,
FOREIGN KEY (id_usuario_seguido) REFERENCES usuario(id_usuario),
FOREIGN KEY (id_usuario_seguidor) REFERENCES usuario(id_usuario)
);

create table pet (
id_pet int primary key auto_increment,
id_usuario int,
nm_pet varchar (200),
especie varchar (50),
raca varchar (50),
idade int,
sexo varchar (50),
porte varchar (50),
descricao varchar(200),
estado_fisico varchar(255),
fotos varchar(100),
vacinado boolean,
vacinas_qual varchar(255),
castrado boolean,
localizacao varchar(50),
data_castrado date,
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);


create table post (
id_post int primary key auto_increment,
id_usuario int,
id_pet int,
tipo_post varchar(100),
titulo varchar(255),
descricao text,
fotos varchar (100),
urgencia bool,
dt_postagem date,
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
FOREIGN KEY (id_pet) REFERENCES pet(id_pet)
);


create table comentario (
id_comentario int primary key auto_increment,
id_post int,
id_usuario int,
texto text,
dt_comentario date,
FOREIGN KEY (id_post) REFERENCES post(id_post),
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

create table curtida (
id_curtida int primary key auto_increment,
id_post int,
id_usuario int,
FOREIGN KEY (id_post) REFERENCES post(id_post),
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

create table desaparecido (
id_desaparecido int primary key auto_increment,
id_usuario int,
id_pet int,
ultima_localizacao varchar(255),
dt_desaparecimento date,
encontrado bool,
dt_registro date,
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
FOREIGN KEY (id_pet) REFERENCES pet(id_pet)
);




##TALVEZ
create table chat_publico(
id_chat_publico int primary key auto_increment,
mensagem text,
id_criador int,
dt_criacao date,
FOREIGN KEY (id_criador) REFERENCES usuario(id_usuario)
);

create table chat_privado (
id_chat_privado int primary key auto_increment,
mensagem text,
id_usuario int,
dt_criacao date,
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

