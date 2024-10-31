export interface UserTypes {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  address?: string;
  zipcode?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
}

export interface formProps {
  onAction: (message?: string, error?: boolean) => void;
}
