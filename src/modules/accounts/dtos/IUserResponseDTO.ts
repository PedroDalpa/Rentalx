interface IUserResponseDTO {
  email: string;
  driver_license: string;
  id: string;
  avatar: string;
  name: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
