interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: string;
}

export interface AuthContextState {
  user: any;
  signIn: (credentials: SignInCredentials) => Promise<SignInResponse>;
  signOut: () => void;
}
