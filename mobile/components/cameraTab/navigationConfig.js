'use strict'
import { StackNavigator } from 'react-navigation'
// Screens
import Camera from './views/Camera'
import Post from './views/Post'
const routeConfig = {
  Camera: { screen: Camera },
  Post: { screen: Post },
}
// going to disable the header for now
const stackNavigatorConfig = {
  headerMode: 'none',
  initialRouteName: 'Camera'
}
export const CameraNav = StackNavigator(routeConfig,stackNavigatorConfig)