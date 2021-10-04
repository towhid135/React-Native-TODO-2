import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './Navigators/MainNav';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import AddReducer from './Store/Reducer/AddReducer';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFont = () =>{
  return Font.loadAsync({
    'GemunuLibreLight': require('./assets/Fonts/Gemunu/GemunuLibre-Light.ttf'),
    'GemunuLibreRegular': require('./assets/Fonts/Gemunu/GemunuLibre-Regular.ttf'),
    'MontserratBold': require('./assets/Fonts/Montserrat/Montserrat-Bold.ttf'),
    'MontserratBoldItalic': require('./assets/Fonts/Montserrat/Montserrat-BoldItalic.ttf')
     
  })
}

const rootReducer = combineReducers({
  allTask: AddReducer,
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  const [fontFlag,setFontFlag] = useState(false);
  if(!fontFlag){
    return <AppLoading 
             startAsync = {fetchFont}
             onFinish = {() => setFontFlag(true)}
             onError = {(err) => console.log(err)}
          />
  }
  
  return (
    <Provider store={store}>
      <MainNav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
