import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { registerStart, registerSuccess, registerFailure } from '../redux/slices/authSlice';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { registerSchema } from '../utils/validationSchemas';
import { Button, Input } from '../components';
import { lightTheme, darkTheme } from '../theme';
import { RegisterCredentials } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const { loading } = useAppSelector((state) => state.auth);

  const handleRegister = async (values: RegisterCredentials) => {
    try {
      dispatch(registerStart());
      const user = await authService.register(values);
      
      // Save to storage
      await storageService.saveToken(user.token);
      await storageService.saveUser(user);
      
      dispatch(registerSuccess(user));
    } catch (error: any) {
      dispatch(registerFailure(error.message));
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Join us and start exploring
          </Text>
        </View>

        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <Input
                label="Username"
                placeholder="Choose a username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={errors.username}
                touched={touched.username}
                iconName="user"
                autoCapitalize="none"
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                iconName="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Input
                label="Password"
                placeholder="Create a password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                iconName="lock"
                secureTextEntry
                autoCapitalize="none"
              />

              <Input
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                iconName="lock"
                secureTextEntry
                autoCapitalize="none"
              />

              <Button
                title="Create Account"
                onPress={handleSubmit as any}
                loading={loading}
                style={styles.registerButton}
              />

              <Button
                title="Already have an account? Sign In"
                onPress={() => navigation.navigate('Login')}
                variant="outline"
                style={styles.loginButton}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 8,
  },
  loginButton: {
    marginTop: 16,
  },
});
