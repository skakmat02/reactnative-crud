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
            TextInput_ID: "",
            TextInput_Nama: "",
            TextInput_Gaji: "",

        };
    }

    componentDidMount() {

        this.setState({
            TextInput_ID: this.props.navigation.state.params.ID,
            TextInput_Nama: this.props.navigation.state.params.NAMA,
            TextInput_Gaji: this.props.navigation.state.params.GAJI,
        });
    }

    updateDataPegawai = () => {
        fetch("http://17.17.17.104/my-react-crud/updateDataPegawai.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pegawai_id: this.state.TextInput_ID,
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
    };

    hapusDataPegawai = () => {
        fetch("http://17.17.17.104/my-react-crud/HapusDataPegawai.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pegawai_id: this.state.TextInput_ID
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                Alert.alert(responseJson);
            })
            .catch(error => {
                console.error(error);
            });

        this.props.navigation.navigate("PegawaiRead");
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
                    Edit Data Pegawai
              </Text>

                <Text style={{ margin: 5 }}>Kode Pegawai : {this.state.TextInput_ID} </Text>

                <TextInput placeholder="Nama Pegawai" value={this.state.TextInput_Nama} onChangeText={TextInputValue => this.setState({ TextInput_Nama: TextInputValue })} underlineColorAndroid="transparent"
                    style={styles.input} />

                <TextInput placeholder="Gaji Karyawan" value={this.state.TextInput_Gaji}
                    onChangeText={TextInputValue => this.setState({ TextInput_Gaji: TextInputValue })} underlineColorAndroid="transparent" style={styles.input} />

                <TouchableOpacity style={styles.tombol} onPress={this.updateDataPegawai} >
                    <Text style={styles.texts}> UPDATE DATA PEGAWAI </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}> _____________ </Text>

                <TouchableOpacity style={styles.tombol} onPress={this.hapusDataPegawai} >
                    <Text style={styles.texts}> DELETE DATA PEGAWAI </Text>
                </TouchableOpacity>
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