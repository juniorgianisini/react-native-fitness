import React from "react";
import {
    View,
    Platform,
    YellowBox,
    StatusBar,
    Text,
    TouchableOpacity
} from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
//import { TabNavigator } from "react-navigation";
import {
    createAppContainer,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator
} from "react-navigation";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";
import { setLocalNotification } from "./utils/helper";
import UdacityImagePicker from './components/UdacityImagePicker';

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}

YellowBox.ignoreWarnings(["Remote debugger"]);

const Tabs = {
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: "History",
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
            )
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: "Add Entry",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="plus-square" size={30} color={tintColor} />
            )
        }
    },
    Live: {
        screen: Live,
        navigationOptions: {
            tabBarLabel: "Live",
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-speedometer" size={30} color={tintColor} />
            )
        }
    },
    UdacityImagePicker: {
      screen: UdacityImagePicker,
      navigationOptions: {
          tabBarLabel: "Image",
          tabBarIcon: ({ tintColor }) => (
              <Ionicons name="speedometer" size={30} color={tintColor} />
          )
      }
  }
};

const navigationOptions = {
    bounces: true,
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : purple,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};

const TabNav = createAppContainer(
    Platform.OS === "ios"
        ? createBottomTabNavigator(Tabs, navigationOptions)
        : createMaterialTopTabNavigator(Tabs, navigationOptions)
);

const MainNavigator = createAppContainer(
    createStackNavigator({
        home: {
            screen: TabNav,
            navigationOptions: {
                header: null
            }
        },
        EntryDetail: {
            screen: EntryDetail,
            navigationOptions: ({ navigation }) => ({
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: purple
                }
            })
        }
    })
);

/*const Home = ({ navigation }) => (
  <View>
    <Text>This is the Home view</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Text>Press here for the Dashboard</Text>
    </TouchableOpacity>
  </View>
);

const Dashboard = () => (
  <View>
    <Text>Este é o Dashboard</Text>
  </View>
);

const Stack = createAppContainer(createStackNavigator({
  Home: {
    screen: Home
  },
  Dashboard: {
    screen: Dashboard
  }
}))*/

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <UdaciStatusBar
                        backgroundColor={purple}
                        barStyle="light-content"
                    />
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}
