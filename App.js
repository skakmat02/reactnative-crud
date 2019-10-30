import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PegawaiMain from './src/PegawaiMain';
// import PegawaiRead from './src/PegawaiRead';
// import PegawaiEdit from './src/PegawaiEdit';



const RootStack = createStackNavigator(
  {
    PegawaiMain: {
      screen: PegawaiMain,
      navigationOptions: {

      }
    },
    // PegawaiEdit: {
    //   screen: PegawaiEdit,
    //   navigationOptions: {

    //   }
    // },   
        // PegawaiRead: {
    //   screen: PegawaiRead,
    //   navigationOptions: {

    //   }
    // },
   
  },
  {
    initialRouteName: 'PegawaiMain', 
  }
);

const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}