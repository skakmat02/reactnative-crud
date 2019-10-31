import React, { Component } from "react";

import {
    StyleSheet,
    View,
    Alert,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from "react-native";


export default class MainActivity extends Component {
    static navigationOptions = {
        title: "Data Pegawai"
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            dataSource: [],
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
    navigation.addListener ('willFocus', () =>{
        return fetch("http://17.17.17.104/my-react-crud/LihatSemuaPegawai.php")
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({ dataSource: responseJson, isLoading: false, });
        })
        .catch((error) => {
            console.error(error);
        });

        
  });
       
    }

    getPegawaiData = (
        pegawai_id,
        pegawai_nama,
        pegawai_gaji
    ) => {
        this.props.navigation.navigate("PegawaiEdit", {
            ID: pegawai_id,
            NAMA: pegawai_nama,
            GAJI: pegawai_gaji,
        });
    };

    renderSeparator = () => {
        return (
            <View style={{
                height: 0.8,
                width: "100%",
                backgroundColor: "#000"
            }} />
        );
    };

    Tambah_Pegawai = () => { this.props.navigation.navigate("PegawaiMain"); };

    lihatDataPegawai = (item) => {
        Alert.alert(
            item.pegawai_id,
            item.pegawai_nama + " \nGaji = " + item.pegawai_gaji,
            [
                {
                    text: 'Edit',
                    onPress: this.getPegawaiData.bind(
                            this,
                            item.pegawai_id,
                            item.pegawai_nama,
                            item.pegawai_gaji,
                        )
                    ,
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 150 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.tombol} onPress={this.Tambah_Pegawai}>
                    <Text style={styles.texts}> INSERT DATA PEGAWAI </Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}> _____________ </Text>

                <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}> List Data Pegawai </Text>
                <FlatList style={styles.tombol}
                    data={this.state.dataSource}
                    renderItem={({ item }) => <Text style={styles.item} onPress={this.lihatDataPegawai.bind(this, item)}> {item.pegawai_nama} </Text>}
                    keyExtractor={(item, index) => index} ItemSeparatorComponent={this.renderSeparator} />
               
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

    tombol: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 7,
        width: "90%",
        backgroundColor: "green",

    },

    texts: {
        color: "white",
        textAlign: "center"
    },

    views: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'white'
    },
    item2: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: 'grey',
        color: 'white'
    },
});