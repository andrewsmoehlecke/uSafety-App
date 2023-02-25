import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.usafety.app',
  appName: 'uSafety-App',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      showSpinner: true,
    }
  }
};

export default config;
