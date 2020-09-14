import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    return accessToken ? JSON.parse(accessToken) : {};
  }

  async setAccessToken(token) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(token)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;