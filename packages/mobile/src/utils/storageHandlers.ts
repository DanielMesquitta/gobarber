import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = '@GoBarber';

export const store = async (name: string, data: any) =>
  AsyncStorage.setItem(`${prefix}:${name}`, JSON.stringify(data));

export const removeFromStorage = async (name: string) =>
  AsyncStorage.removeItem(`${prefix}:${name}`);

export const getFromStorage = async <T>(name: string) => {
  const data = await AsyncStorage.getItem(`${prefix}:${name}`);
  return JSON.parse(data) as T;
};
