use beeplus_um;

/*Start Of User Management*/
        /*Update User Details*/
            delimiter //

                CREATE PROCEDURE user_updateUserDetails(
                    IN fname varchar(255),
                    IN lname varchar(255),
                    IN dob date,
                    IN phoneNo varchar(10),
                    IN gender varchar(1),
                    IN address varchar(255),
                    IN id bigint(200),
                    OUT status int
                    )
                    BEGIN
                        /*Start Error Handling*/
                            DECLARE EXIT HANDLER FOR SQLEXCEPTION
                            BEGIN
                                ROLLBACK;
                                SET status = 0;
                                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                            END;
                        /*End Error Handling*/

                        START TRANSACTION;

                            UPDATE usr_User
                            SET usr_User.fname = fname,
                            usr_User.lname = lname,
                            usr_User.dob = dob,
                            usr_User.phoneNo = phoneNo,
                            usr_User.gender = gender,
                            usr_User.address = address
                            WHERE usr_User.id = id;
                            SET status = 1;

                        COMMIT;
                    END//
            delimiter ;

        /*Delete User*/
            delimiter //

                CREATE PROCEDURE user_deleteUser(
                    IN id bigint(200),
                    OUT status int
                    )
                    BEGIN
                        /*Start Error Handling*/
                            DECLARE EXIT HANDLER FOR SQLEXCEPTION
                            BEGIN
                                ROLLBACK;
                                SET status = 0;
                                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                            END;
                        /*End Error Handling*/

                        START TRANSACTION;

                            UPDATE usr_User
                            set usr_User.isDelete = 1, usr_User.isActive = 0
                            WHERE usr_User.id = id;
                            SET status = 1;

                        COMMIT;
                    END//
            delimiter ;

        /*Change Password*/
            delimiter //

            CREATE PROCEDURE user_changePassword(
                IN password varchar(255),
                IN email varchar(255),
                OUT status int
                )
                BEGIN
                    /*Start Error Handling*/
                        DECLARE EXIT HANDLER FOR SQLEXCEPTION
                        BEGIN
                            ROLLBACK;
                            SET status = 0;
                            SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                        END;
                    /*End Error Handling*/

                    
                    START TRANSACTION;

                        UPDATE usr_Login
                        SET usr_Login.password = password
                        WHERE usr_Login.email = email;
                        SET status = 1;

                    COMMIT;
                
                END//
                delimiter ;

        /*Forgot Password*/
            delimiter //

                CREATE PROCEDURE user_forgotPassword(
                    IN password varchar(255),
                    IN userId bigint(200),
                    OUT status int
                    )
                    BEGIN
                        /*Start Error Handling*/
                            DECLARE EXIT HANDLER FOR SQLEXCEPTION
                            BEGIN
                                ROLLBACK;
                                SET status = 0;
                                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                            END;
                        /*End Error Handling*/

                        
                        START TRANSACTION;

                            UPDATE usr_Login
                            set usr_Login.password = password
                            WHERE usr_Login.userId = userId;
                            SET status = 1;
                    
                        COMMIT;
                    
                    END//
            delimiter ;

        /*Email Confirmation*/
            delimiter //

                CREATE PROCEDURE user_confirmEmailConfirmation(
                    IN email varchar(255),
                    IN confirmationCode varchar(255),
                    OUT status int
                    )
                    BEGIN
                        /*Start Error Handling*/
                            DECLARE EXIT HANDLER FOR SQLEXCEPTION
                            BEGIN
                                ROLLBACK;
                                SET status = 0;
                                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                            END;
                        /*End Error Handling*/

                        
                        START TRANSACTION;

                            UPDATE usr_Login
                            SET usr_Login.isConfirmed = 1
                            WHERE usr_Login.email = email and usr_Login.confirmationCode = confirmationCode;
                            SET status = 1;
                    
                        COMMIT;
                    
                    END//
            delimiter ;

        /*Request Email Confirmation Code*/
            delimiter //

                CREATE PROCEDURE user_requestEmailConfirmationCode(
                    IN confirmationCode varchar(255),
                    IN email varchar(255),
                    OUT status int
                    )
                    BEGIN
                        /*Start Error Handling*/
                            DECLARE EXIT HANDLER FOR SQLEXCEPTION
                            BEGIN
                                ROLLBACK;
                                SET status = 0;
                                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                            END;
                        /*End Error Handling*/

                        
                        START TRANSACTION;

                            UPDATE usr_Login
                            SET usr_Login.confirmationCode = confirmationCode
                            WHERE usr_Login.email = email;
                            SET status = 1;
                    
                        COMMIT;
                    
                    END//
            delimiter ;

/*End of User Management*/

/*Start Of Customer Management*/
        /* Customer Registration */

            delimiter //

            CREATE PROCEDURE customer_Registration(
                /*usr_User*/
                IN fname varchar(255),
                IN lname varchar(255),
                IN dob date,
                IN phoneNo varchar(10),
                IN gender varchar(1),
                IN address varchar(255),
                /*usr_Login*/
                IN email varchar(255),
                IN password varchar(255),
                IN roleId bigint(200),
                IN confirmationCode varchar(8),
                /*usr_dtl_Client*/
                OUT status int
                )
                BEGIN
                    DECLARE userID bigint(200);
                    /*Start Error Handling*/
                        DECLARE EXIT HANDLER FOR 1062
                        BEGIN
                            ROLLBACK;
                            SET status = 0;
                            SELECT CONCAT('Duplicate key occurred') AS message;
                        END;

                        DECLARE EXIT HANDLER FOR SQLEXCEPTION
                        BEGIN
                            ROLLBACK;
                            SET status = 0;
                            SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                        END;
                    /*End Error Handling*/

                    
                    START TRANSACTION;

                        INSERT INTO usr_User(fname, lname, dob, phoneNo, gender, address, isActive, isDelete) VALUES(fname, lname, dob, phoneNo, gender, address, 1, 0);
                        SELECT MAX(id) INTO userID FROM usr_User;
                        INSERT INTO usr_Login VALUES(userID, email, password, roleId, 0, confirmationCode);
                        INSERT INTO usr_dtl_Customer VALUES(userID);
                        SET status = 1;

                    COMMIT;
                
                END//
            delimiter ;

        /*Update Customer details*/
            delimiter //

                CREATE PROCEDURE customer_updateCustomerDetails(
                    IN userId bigint(200),
                    OUT status int
                    )
                    BEGIN
                        /*Start Error Handling*/
                            DECLARE EXIT HANDLER FOR SQLEXCEPTION
                            BEGIN
                                ROLLBACK;
                                SET status = 0;
                                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                            END;
                        /*End Error Handling*/

                        START TRANSACTION;

                            /*UPDATE usr_dtl_Client
                            WHERE usr_dtl_Client.id = userId;*/
                            
                            SET status = 1;

                        COMMIT;
                    END//
            delimiter ;

        /*Delete Customer*/
            delimiter //

                CREATE PROCEDURE customer_deleteCustomer(
                    IN id bigint(200),
                    OUT status int
                    )
                    BEGIN
                        /*Start Error Handling*/
                            DECLARE EXIT HANDLER FOR SQLEXCEPTION
                            BEGIN
                                ROLLBACK;
                                SET status = 0;
                                SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
                            END;
                        /*End Error Handling*/

                        START TRANSACTION;

                            DELETE FROM usr_dtl_Customer WHERE usr_dtl_Customer.id = id;
                            DELETE FROM usr_Login WHERE usr_Login.userId = id;
                            DELETE FROM usr_User WHERE usr_User.id = id;
                            SET status = 1;

                        COMMIT;
                    END//
            delimiter ;

/*End Of Customer Management*/