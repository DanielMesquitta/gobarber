interface ICreateUserDTO {
  name: string;
  email: string;
  password_hash: string;
  is_provider?: boolean;
}

export default ICreateUserDTO;
