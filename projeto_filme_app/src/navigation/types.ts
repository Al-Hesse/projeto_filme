import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  FilmeList: undefined;
  FilmeDetail: { id: number; titulo: string };
  FilmeForm: { id?: number };
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export type FilmeListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FilmeList'
>;

export type FilmeDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FilmeDetail'
>;

export type FilmeFormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FilmeForm'
>;
