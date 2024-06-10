export interface SignUpFormData {
    username: string;
    email: string;
    password: string;
}

export interface LoginFormInputs {
    username: string;
    password: string;
}

export interface LoginFormProps {
    onSubmit: (data: LoginFormInputs) => void;
}

export interface SignUpFormProps {
    onSubmit: (data: SignUpFormData) => void;
  }
