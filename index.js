/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import MainReduxSetup from './src/MainReduxSetup'

AppRegistry.registerComponent(appName, () => MainReduxSetup);
