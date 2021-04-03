import React, { createContext, useContext, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

import { KeyboardContextState } from './types';

const KeyboardContext = createContext<KeyboardContextState>(
  {} as KeyboardContextState
);

const KeyboardProvider: React.FC = ({ children, ...rest }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });
    Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return (
    <KeyboardContext.Provider value={{ isKeyboardOpen }} {...rest}>
      {children}
    </KeyboardContext.Provider>
  );
};

const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  if (!context)
    throw new Error('useKeyboard must be used within a KeyboardProvider');
  return context;
};

export { KeyboardProvider, useKeyboard };
