import React from 'react';

import { KeyboardProvider, useKeyboard } from './keyboard';

const RootProvider: React.FC = ({ children }) => (
  <KeyboardProvider>{children}</KeyboardProvider>
);

export { RootProvider, useKeyboard };
