DROP DATABASE IF EXISTS `beeplus_um`;

CREATE DATABASE IF NOT EXISTS `beeplus_um` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `beeplus_um`;

CREATE TABLE usr_User (
  id bigint(200) AUTO_INCREMENT NOT NULL,
  fname varchar(255) NOT NULL,
  lname varchar(255) NOT NULL,
  dob DATE DEFAULT NULL,
  phoneNo varchar(10) DEFAULT NULL,
  gender varchar(1) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  isActive BOOLEAN NOT NULL,
  isDelete BOOLEAN NOT NULL,
  CONSTRAINT usr_User_pk PRIMARY KEY(id)
);

CREATE TABLE usr_Role (
  id bigint(200) AUTO_INCREMENT NOT NULL,
  roleName varchar(255) NOT NULL,
  roleDesc varchar(255) DEFAULT NULL,
  isActive BOOLEAN NOT NULL,
  CONSTRAINT usr_role_pk PRIMARY KEY(id)
);

CREATE TABLE usr_Login (
  userId bigint(200) DEFAULT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) DEFAULT NULL,
  roleId bigint(200) DEFAULT NULL,
  isConfirmed int(1) NOT NULL,
  confirmationCode varchar(8) NOT NULL,
  CONSTRAINT usr_login_pk PRIMARY KEY(email),
  CONSTRAINT usr_login_fk FOREIGN KEY(userId) REFERENCES usr_User(id),
  CONSTRAINT usr_login_fk_roleId FOREIGN KEY(roleId) REFERENCES usr_Role(id)
);

CREATE TABLE usr_dtl_Customer(
    id bigint(200) NOT NULL,
    CONSTRAINT usr_Client_pk PRIMARY KEY(id),
    CONSTRAINT usr_Client_fk_id FOREIGN KEY(id) REFERENCES usr_User(id)
);