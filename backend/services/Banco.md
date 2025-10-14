create database tcc_frei;
use tcc_frei;

create table usuario(
id_usuario int primary key auto_increment,
nm_usuario varchar(50),
email varchar(50),
senha varchar(40),
biografia varchar(1000),
telefone varchar (12),
cidade varchar (35),
ehOng boolean,
foto_perfil varchar(100),
dt_criacao date
);

create table seguidor (
id_seguidor int primary key auto_increment,
id_usuario_seguido int,
id_usuario_seguidor int,
dt_seguimento date,
notificacoes boolean
);

create table perfil (
id_perfil int primary key auto_increment,
id_usuario int,
id_seguidor int,
id_post int
);

create table pet (
id_pet int primary key auto_increment,
id_usuario int,
nm_pet varchar (50),
especie varchar (50),
raca varchar (50),
idade int,
sexo varchar (50),
porte varchar (50),
descricao varchar(200),
status varchar (100),
fotos varchar(100),
vacinado boolean,
castrado boolean,
localizacao varchar(50),
data_castrado date
);

create table mensagem_privada (
id_mensagem_privada int primary key auto_increment,
id_chat_privado int,
id_usuario int,
texto varchar (1000),
dt_envio date,
ehLida boolean
);

create table mensagem_publica(
id_mensagem_publica int primary key auto_increment,
id_chat_publico int,
texto varchar (1000),
dt_envio date
);
create table chat_privado (
id_chat_privado int primary key auto_increment,
participantes varchar (100),
id_pet int,
tipo_chat varchar (100),
dt_criacao date,
ultima_mensagm varchar (1000)
);

create table chat_publico(
id_chat_publico int primary key auto_increment,
nome varchar (70),
descricao varchar (1000),
id_criador int,
cidade varchar (35),
estado varchar (50),
dt_criacao date
);

create table post (
id_post int primary key auto_increment,
id_usuario int,
id_pet int,
tipo_post varchar(100),
titulo varchar(1000),
descricao varchar (1000),
fotos varchar (100),
urgencia varchar (50),
dt_postagem date,
status varchar(100)
);

create table comentario (
id_comentario int primary key auto_increment,
id_post int,
id_usuario int,
texto varchar (1000),
dt_comentario date
);

create table curtida (
id_curtida int primary key auto_increment,
id_post int,
id_usuario int,
dt_curtida date
);

create table desaparecido (
id_desaparecido int primary key auto_increment,
id_usuario int,
id_pet int,
ultima_localizacao varchar(100),
dt_desaparecimento date,
status varchar (100),
dt_registro date
);
