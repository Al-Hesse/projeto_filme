import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  FilmeList: undefined;
  FilmeDetail: { id: number; titulo: string };
  FilmeForm: { id?: number };
};

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
