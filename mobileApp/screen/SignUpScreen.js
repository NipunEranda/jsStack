import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Axios from "axios";
import SignInScreen from "./SignInScreen";




const SignUpScreen = ({ navigation }) => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phoneNo: "",
        gender: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        checkFirstNameInputChange: false,
        checkLastNameInputChange: false,
        checkDobInputChange: false,
        checkPhoneNoInputChange: false,
        checkGenderInputChange: false,
        checkAddressInputChange: false,
        checkEmailInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    const [res, setRes] = useState({
        err: "",
        res: ""
    });

    const firstNameChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                firstName: val,
                checkFirstNameInputChange: true
            });
        } else {
            setData({
                ...data,
                firstName: val,
                checkFirstNameInputChange: false
            });
        }
    };

    const lastNameChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                lastName: val,
                checkLastNameInputChange: true
            });
        } else {
            setData({
                ...data,
                lastName: val,
                checkLastNameInputChange: false
            });
        }
    };

    const dobChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                dob: val,
                checkDobInputChange: true
            });
        } else {
            setData({
                ...data,
                dob: val,
                checkDobInputChange: false
            });
        }
    };

    const phoneNoChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                phoneNo: val,
                checkPhoneNoInputChange: true
            });
        } else {
            setData({
                ...data,
                phoneNo: val,
                checkPhoneNoInputChange: false
            });
        }
    };

    const genderChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                gender: val,
                checkGenderInputChange: true
            });
        } else {
            setData({
                ...data,
                gender: val,
                checkGenderInputChange: false
            });
        }
    };

    const addressChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                address: val,
                checkAddressInputChange: true
            });
        } else {
            setData({
                ...data,
                address: val,
                checkAddressInputChange: false
            });
        }
    };

    const emailChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                checkEmailInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                checkEmailInputChange: false
            });
        }
    };

    const passwordChange = (val) => {
        setData({
            ...data,
            password: val
        })
    };

    const confirmChange = (val) => {
        setData({
            ...data,
            confirmPassword: val
        })
    };

    const verifyData = (firstName, lastName, dob, phoneNo, gender, address, email, password, confirmPassword) => {
        if (firstName == null || firstName.length == 0) {
            Alert.alert(`${res.err}`, "First name cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (lastName == null || lastName.length == 0) {
            Alert.alert(`${res.err}`, "Last name cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (dob == null || dob.length == 0) {
            Alert.alert(`${res.err}`, "Date of Birth cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (phoneNo == null || phoneNo.length == 0) {
            Alert.alert(`${res.err}`, "Phone number cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (gender == null || gender.length == 0) {
            Alert.alert(`${res.err}`, "Gender cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (address == null || address.length == 0) {
            Alert.alert(`${res.err}`, "Address cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (email == null || email.length == 0) {
            Alert.alert(`${res.err}`, "Email cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (password == null || password.length == 0) {
            Alert.alert(`${res.err}`, "Password cannot be empty", [
                { text: "Ok" }
            ]);
            return false;
        }
        if (confirmPassword == null || confirmPassword.length == 0) {
            Alert.alert(`${res.err}`, "Confirm password doesn't match with the password", [
                { text: "Ok" }
            ]);
            return false;
        }
        return true;
    }

    const registerUser = () => {
        const { firstName, lastName, dob, phoneNo, gender, address, email, password, confirmPassword } = data;
        if (verifyData(firstName, lastName, dob, phoneNo, gender, address, email, password, confirmPassword)) {
            if (password == confirmPassword) {
                Axios.post("http://192.168.1.144:5000/user/register", {
                    firstName,
                    lastName,
                    dob,
                    phoneNo,
                    gender,
                    address,
                    email,
                    password,
                }).then(res => {
                    if (res.status == 200) {
                        navigation.navigate('SignInScreen');
                    } else {
                        console.log(res)
                    }
                }).then(res1 => {
                    Alert.alert(`${res.err}`, "Check", [
                        { text: "Ok" }
                    ])

                })
                    .catch(err => console.log(err.response))
            } else {
                Alert.alert(`${res.err}`, "Confirm password doesn't match with the password", [
                    { text: "Ok" }
                ]);
                console.log("Passwords doesn't match");
            }
        } else {
            console.log("Some of fields are empty");
        }

    };


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    };
    const { colors } = useTheme();
    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Now!</Text>
                </View>
                <Animatable.View
                    animation="fadeInLeft"
                    style={styles.footer}>
                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>First Name</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"Your First Name"}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => firstNameChange(val)}
                                />
                            </View>

                            {data.checkFirstNameInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                    </View>

                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Last Name</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"Your Last Name"}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => lastNameChange(val)}
                                />
                            </View>

                            {data.checkLastNameInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                    </View>

                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Date of Birth</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"YYYY-MM-DD"}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => dobChange(val)}
                                />
                            </View>

                            {data.checkDobInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                    </View>

                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Mobile</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"Your Mobile Number"}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => phoneNoChange(val)}
                                />
                            </View>

                            {data.checkPhoneNoInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                    </View>

                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Gender</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"Male / Female"}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => genderChange(val)}
                                />
                            </View>

                            {data.checkGenderInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                    </View>

                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Address</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"Your Address"}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => addressChange(val)}
                                />
                            </View>

                            {data.checkAddressInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                    </View>

                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Email</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"Your Email"}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => emailChange(val)}
                                />
                            </View>

                            {data.checkEmailInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>

                    </View>
                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Password</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <Feather
                                    name="lock"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder={"Your Password"}
                                    placeholderTextColor="#666666"
                                    secureTextEntry={data.secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    onChangeText={(val) => passwordChange(val)}
                                    autoCapitalize="none"
                                />
                            </View>

                            <TouchableOpacity
                                onPress={updateSecureTextEntry}
                            >
                                {data.secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    />
                                    :
                                    <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.action}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Confirm Password</Text>
                        <View style={styles.style1}>
                            <View style={{ flexDirection: "row" }}>
                                <Feather
                                    name="lock"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    type={"password"}
                                    placeholder={"Your Password"}
                                    placeholderTextColor="#666666"
                                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    onChangeText={(val) => confirmChange(val)}
                                    autoCapitalize="none"
                                />
                            </View>

                            <TouchableOpacity
                                onPress={updateConfirmSecureTextEntry}
                            >
                                {data.confirm_secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    />
                                    :
                                    <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignInScreen')}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 5
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { registerUser() }}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </Animatable.View>
            </View>
        </ScrollView>
    );
};

SignUpScreen.navigationOptions = nav => {
    return {
        headerTitle: "Register"
    }
};

const styles = StyleSheet.create({
    style1: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between"
    },
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },
    color_textPrivate: {
        color: 'grey'
    },
    action: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        marginTop: -5,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default SignUpScreen;
