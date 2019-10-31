import React, { Component } from "react";

import {
    StyleSheet,
    View,
    Alert,
    TextInput,
    Text,
    TouchableOpacity,
} from "react-native";


export default class MainActivity extends Component {
    static navigationOptions = {
        title: "Data Pegawai"
    };

    constructor(props) {
        super(props);
        this.state = {
            TextInput_Nama: "",
            TextInput_Gaji: ""
        };
    }

    Insert_Pegawai = () => {

        if (this.state.TextInput_Nama.trim() === "" || this.state.TextInput_Gaji.trim() === "" ) {
            this.setState(() => ({ nameError: "Harus Diisi Semua." }));
          } else {
            
          
        fetch("http://17.17.17.104/my-react-crud/InsertDataPegawai.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pegawai_nama: this.state.TextInput_Nama,
                pegawai_gaji: this.state.TextInput_Gaji,

            })
        })
            .then(response => response.json())
            .then(responseJson => {

                Alert.alert(responseJson);
                this.props.navigation.navigate("PegawaiRead");
            })
            .catch(error => {
                console.error(error);
            });
        }
    };

    Lihat_Pegawai = () => {
        this.props.navigation.navigate("PegawaiRead");
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}> Insert Data Pegawai </Text>

                {!!this.state.nameError && (<Text style={{ color: "red", marginBottom: 2 }}>{this.state.nameError}</Text>)}

                <TextInput placeholder="Data Nama" onChangeText={TextInputValue => this.setState({ TextInput_Nama: TextInputValue })} style={styles.input} />

                <TextInput placeholder="Data Gaji" onChangeText={TextInputValue => this.setState({ TextInput_Gaji: TextInputValue })} style={styles.input} />


                <TouchableOpacity style={styles.tombol} onPress={this.Insert_Pegawai} >
                    <Text style={styles.texts}> SIMPAN DATA PEGAWAI </Text>
                </TouchableOpacity>
                {/* <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}> _____________ </Text>

                <TouchableOpacity style={styles.tombol} onPress={this.Lihat_Pegawai}>
                    <Text style={styles.texts}> LIHAT DATA PEGAWAI </Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        paddingTop: 30,
        backgroundColor: "#fff"
    },

    input: {
        textAlign: "center",
        width: "90%",
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 5
    },

    tombol: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 7,
        width: "90%",
        backgroundColor: "green"
    },

    texts: {
        color: "#fff",
        textAlign: "center"
    },

    views: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    }
});