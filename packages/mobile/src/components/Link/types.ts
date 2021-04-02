import { ContainedTouchableProperties } from 'react-native-gesture-handler';

type Appearance = 'primary' | 'secondary';

export interface Props extends ContainedTouchableProperties {
  children: string;
  appearance?: Appearance;
  icon?: string;
  href: string;
}

export interface TextProps {
  appearance: Appearance;
}

export interface IconProps {
  appearance: Appearance;
}
