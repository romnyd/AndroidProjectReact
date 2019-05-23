/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,WebView, Image,TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { SuperGridSectionList } from 'react-native-super-grid';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import WebViewBridge from 'react-native-webview-bridge';
import createReactClass from 'create-react-class';

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  
  welcome: {
    flex: 1,
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "skyblue"
  },
  webViewContainer: {
    flex: 4
  }
});

const slides = [
  {
    key: 's1',
    text: 'Best Recharge offers',
    title: 'Mobile Recharge',
    titleStyle: styles.title,
    textStyle: styles.text,    
    image: require('./assets/mobile_recharge.png'),
    imageStyle: styles.image,
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    titleStyle: styles.title,
    text: 'Upto 25% off on Domestic Flights',
    image: require('./assets/flight_ticket_booking.png'),    
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    titleStyle: styles.title,
    text: 'Enjoy Great offers on our all services',
    image: require('./assets/discount1.png'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    titleStyle: styles.title,
    text: ' Best Deals on all our services',
    image: require('./assets/best_deals1.png'),
    imageStyle: styles.image,
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    titleStyle: styles.title,
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: require('./assets/bus_ticket_booking.png'),
    imageStyle: styles.image,
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    titleStyle: styles.title,
    text: ' 10% off on first Train booking',
    image: require('./assets/train_ticket_booking.png'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
];
const injectScript = `
  (function () {
    if (WebViewBridge) {
      WebViewBridge.onMessage = function (message) {
        if (message === "hello from react-native") {
          WebViewBridge.send("got the message inside webview");
        }
      };
      WebViewBridge.send("hello from webview");
    }
  }());
`;

export default class App extends Component {
  
  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      text: "ReactNative WebView Sample",
      showRealApp: false,
      //To show the main page of the app
      items: [
        {
          title: 'Title1',
          data: [
            { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
            { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
            { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
            { name: 'NEPHRITIS', code: '#27ae60' },
          ]
        },
        {
          title: 'Title2',
          data: [
            { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
            { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
            { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
          ]
        },
        {
          title: 'Title3',
          data: [
            { name: 'BELIZE HOLE', code: '#2980b9' }, { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
            { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
            { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' }
          ]
        }
      ],
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd']
      ]

    };
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
  
  
  }
  handleDataReceived(msgData) {
    this.setState({
      text2: `Message from web view ${msgData.data}`
    });
    msgData.isSuccessfull = true;
    msgData.args = [msgData.data % 2 ? "green" : "red"];
    this.myWebView.postMessage(JSON.stringify(msgData));
  }

  onWebViewMessage(event) {
    console.log("Message received from webview");

    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }

    switch (msgData.targetFunc) {
      case "handleDataReceived":
        this[msgData.targetFunc].apply(this, [msgData]);
        break;
    }
  }
  
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
  _navigateSomewhere = () => {
    this.props.navigation.navigate('DetailsScreen');
    //NavigationActions.navigate({ routeName: 'DetailsScreen' })
  }
 
  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    
  }
  
  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
        <SuperGridSectionList
          itemDimension={130}
          sections={this.state.items}
          style={styles.gridView}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={{ color: 'green' }}>{section.title}</Text>
          )}
        />
      );
      
      return (
        <View style={styles.container}>
          <Table borderStyle={{borderColor: 'transparent'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
            {
              state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                  } 
                </TableWrapper>
              ))
            }
          </Table>

          <WebView
        //source={{uri: 'http://leonidasesteban.github.io/react-discussions/'}}
        source={{uri: 'https://itaupoc.azurewebsites.net/'}}
        style={{marginTop: 20}}
        renderLoading={this.ActivityIndicatorLoadingView}
        startInLoadingState={true}
      />
        </View>
      );

      // return (
      //   <View style={styles.container}>
      //     <Text style={styles.welcome}>{this.state.text}</Text>
      //     <Text style={styles.welcome}>{this.state.text2}</Text>
      //     <View style={styles.webViewContainer}>
      //       <WebView
      //         ref={webview => {
      //           this.myWebView = webview;
      //         }}
      //         scrollEnabled={false}
      //         source={require("./resources/index.html")}
      //         onMessage={this.onWebViewMessage}
      //       />
      //     </View>
      //   </View>
      // );
    
    
    } else {
      //Intro slides
      return (
        <AppIntroSlider
          slides={slides}
          //comming from the JsonArray below
          onDone={this._onDone}
          //onDone={this._navigateSomewhere}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
          //_onSkip= {this._navigateSomewhere}
        />
      );
    }
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }  
}
// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   Details: {
//     screen: DetailsScreen,
//   },
// }, {
//     initialRouteName: 'Home',
// });

// const App =  createAppContainer(AppNavigator);
// export default App;