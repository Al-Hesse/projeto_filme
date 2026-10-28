import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { filmeFormSchema, FilmeFormData } from '../schemas/filme.schema';
import { Filme, SelectedImage } from '../types/filme.types';
import { colors, spacing, borderRadius } from '../../../theme/theme';

interface FilmeFormProps {
  initialData?: Filme | null;
  onSubmit: (data: FilmeFormData, image: SelectedImage | null) => Promise<void>;
  isLoading: boolean;
  submitButtonText?: string;
}

export const FilmeForm: React.FC<FilmeFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  submitButtonText = 'Salvar',
}) => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
    initialData?.foto || null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FilmeFormData>({
    resolver: zodResolver(filmeFormSchema),
    defaultValues: {
      titulo: initialData?.titulo || '',
      genero: initialData?.genero || '',
      diretor: initialData?.diretor || '',
      ano: initialData ? String(initialData.ano) : '',
      duracao_em_minutos: initialData
        ? String(initialData.duracao_em_minutos)
        : '',
      data_de_lancamento: initialData?.data_de_lancamento || '',
    },
  });

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'É necessário conceder permissão à galeria para selecionar uma imagem.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [2, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedImage({
          uri: asset.uri,
          name: asset.fileName || 'filme_poster.jpg',
          type: asset.mimeType || 'image/jpeg',
        });
        setExistingImageUrl(null);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setExistingImageUrl(null);
  };

  const handleFormSubmit = async (data: FilmeFormData) => {
    await onSubmit(data, selectedImage);
  };

  const currentDisplayImage = selectedImage?.uri || existingImageUrl;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      {/* Imagem / Poster Picker */}
      <View style={styles.imagePickerContainer}>
        <Text style={styles.label}>Pôster do Filme</Text>
        {currentDisplayImage ? (
          <View style={styles.imagePreviewWrapper}>
            <Image
              source={{ uri: currentDisplayImage }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={[styles.smallBtn, styles.editImgBtn]}
                onPress={pickImage}
              >
                <Text style={styles.smallBtnText}>Trocar Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallBtn, styles.deleteImgBtn]}
                onPress={removeImage}
              >
                <Text style={styles.smallBtnText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadPlaceholder}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            <Text style={styles.uploadIcon}>📷</Text>
            <Text style={styles.uploadText}>Selecionar Imagem</Text>
            <Text style={styles.uploadSubtext}>Toque para abrir a galeria</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Título */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Título <Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="titulo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.titulo && styles.inputError]}
              placeholder="Ex: Interestelar"
              placeholderTextColor="#9CA3AF"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.titulo && (
          <Text style={styles.errorText}>{errors.titulo.message}</Text>
        )}
      </View>

      {/* Gênero */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Gênero <Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="genero"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.genero && styles.inputError]}
              placeholder="Ex: Ficção Científica, Drama"
              placeholderTextColor="#9CA3AF"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.genero && (
          <Text style={styles.errorText}>{errors.genero.message}</Text>
        )}
      </View>

      {/* Diretor */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Diretor <Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="diretor"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.diretor && styles.inputError]}
              placeholder="Ex: Christopher Nolan"
              placeholderTextColor="#9CA3AF"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.diretor && (
          <Text style={styles.errorText}>{errors.diretor.message}</Text>
        )}
      </View>

      {/* Linha dupla: Ano e Duração */}
      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.flex1]}>
          <Text style={styles.label}>
            Ano <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="ano"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.ano && styles.inputError]}
                placeholder="Ex: 2024"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.ano && (
            <Text style={styles.errorText}>{errors.ano.message}</Text>
          )}
        </View>

        <View style={[styles.inputGroup, styles.flex1]}>
          <Text style={styles.label}>
            Duração (min) <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="duracao_em_minutos"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.duracao_em_minutos && styles.inputError,
                ]}
                placeholder="Ex: 142"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.duracao_em_minutos && (
            <Text style={styles.errorText}>
              {errors.duracao_em_minutos.message}
            </Text>
          )}
        </View>
      </View>

      {/* Data de Lançamento */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Data de Lançamento (AAAA-MM-DD) <Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="data_de_lancamento"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.data_de_lancamento && styles.inputError,
              ]}
              placeholder="Ex: 2024-03-15"
              placeholderTextColor="#9CA3AF"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.data_de_lancamento && (
          <Text style={styles.errorText}>
            {errors.data_de_lancamento.message}
          </Text>
        )}
      </View>

      {/* Botão de Enviar */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={() => handleSubmit(handleFormSubmit)()}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.submitButtonText}>{submitButtonText}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  imagePickerContainer: {
    marginBottom: spacing.md,
  },
  imagePreviewWrapper: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
  },
  imagePreview: {
    width: 140,
    height: 190,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  imageActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  smallBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  editImgBtn: {
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  deleteImgBtn: {
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  smallBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
  uploadPlaceholder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.cardBorder,
    borderRadius: borderRadius.md,
    backgroundColor: colors.card,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  uploadSubtext: {
    fontSize: 12,
    color: colors.textSubtle,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  flex1: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.secondary,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.white,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
