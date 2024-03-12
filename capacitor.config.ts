import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pt.gymspot.app',
  appName: 'GymSpot',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
