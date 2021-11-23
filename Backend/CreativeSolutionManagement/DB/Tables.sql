DROP DATABASE IF EXISTS `beeplus_csm`;

CREATE DATABASE IF NOT EXISTS `beeplus_csm` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `beeplus_csm`;

/*Model tables*/

CREATE TABLE z_category(
    id BIGINT(200) AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    isActive BOOLEAN NOT NULL,
    isDelete BOOLEAN NOT NULL,
    CONSTRAINT z_category_pk PRIMARY KEY(id)
);

CREATE TABLE z_subCategory(
    id BIGINT(200) AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    categoryId BIGINT(200) NOT NULL,
    isActive BOOLEAN NOT NULL,
    isDelete BOOLEAN NOT NULL,
    CONSTRAINT z_subCategory_pk PRIMARY KEY(id),
    CONSTRAINT z_subCategory_fk_categoryId FOREIGN KEY(categoryId) REFERENCES z_category(id)
);

CREATE TABLE z_supplier(
    id BIGINT(200) NOT NULL,
    joinedDate DATE NOT NULL,
    CONSTRAINT z_supplier_pk PRIMARY KEY(id)
);

CREATE TABLE z_item(
    id BIGINT(200) AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    barcode VARCHAR(255) DEFAULT NULL,
    categoryId BIGINT(200) NOT NULL,
    subCategoryId BIGINT(200) NOT NULL,
    supplierId BIGINT(200) NOT NULL,
    isActive BOOLEAN NOT NULL,
    isDelete BOOLEAN NOT NULL,
    CONSTRAINT z_item_pk PRIMARY KEY(id),
    CONSTRAINT z_item_fk_categoryId FOREIGN KEY(categoryId) REFERENCES z_category(id),
    CONSTRAINT z_item_fk_subCategoryId FOREIGN KEY(subCategoryId) REFERENCES z_subCategory(id),
    CONSTRAINT z_item_fk_supplierId FOREIGN KEY(supplierId) REFERENCES z_supplier(id)
);

CREATE TABLE z_order(
    id BIGINT(200) AUTO_INCREMENT NOT NULL,
    customerId BIGINT(200) NOT NULL,
    placedAt DATE NOT NULL,
    completedAt DATE NOT NULL,
    stat VARCHAR(255) NOT NULL,
    totPrice FLOAT NOT NULL,
    isCanceled BOOLEAN NOT NULL,
    CONSTRAINT z_order_pk PRIMARY KEY(id)
);

CREATE TABLE z_delivery(
    id BIGINT(200) AUTO_INCREMENT NOT NULL,
    currierId BIGINT(200) NOT NULL,
    stat VARCHAR(255) NOT NULL,
    orderId BIGINT(200) NOT NULL,
    CONSTRAINT z_delivery_pk PRIMARY KEY(id),
    CONSTRAINT z_delivery_fk_orderId FOREIGN KEY(orderId) REFERENCES z_order(id)
);

/*Mix tables*/

CREATE TABLE z_item_z_order(
    id BIGINT(200) AUTO_INCREMENT NOT NULL,
    itemId BIGINT(200) NOT NULL,
    orderId BIGINT(200) NOT NULL,
    qty int NOT NULL,
    CONSTRAINT z_item_z_order_pk PRIMARY KEY(id),
    CONSTRAINT z_item_z_order_fk_itemId FOREIGN KEY(itemId) REFERENCES z_item(id),
    CONSTRAINT z_item_z_order_fk_orderId FOREIGN KEY(orderId) REFERENCES z_order(id)
);