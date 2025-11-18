import React, { useState } from 'react';
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
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { loginSchema } from '../utils/validationSchemas';
import { Button, Input } from '../components';
import { lightTheme, darkTheme } from '../theme';
import { LoginCredentials } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const { loading } = useAppSelector((state) => state.auth);

  const handleLogin = async (values: LoginCredentials) => {
    try {
      dispatch(loginStart());
      const user = await authService.login(values);
      
      // Save to storage
      await storageService.saveToken(user.token);
      await storageService.saveUser(user);
      
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      Alert.alert('Login Failed', error.message);
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
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Sign in to continue your journey
          </Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
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
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                iconName="lock"
                secureTextEntry
                autoCapitalize="none"
              />

              <Button
                title="Sign In"
                onPress={handleSubmit as any}
                loading={loading}
                style={styles.loginButton}
              />

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
                <Text style={[styles.dividerText, { color: theme.colors.textSecondary }]}>
                  OR
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
              </View>

              <Button
                title="Create Account"
                onPress={() => navigation.navigate('Register')}
                variant="outline"
              />

              <Text style={[styles.hint, { color: theme.colors.textSecondary }]}>
                Hint: Use username: emilys, password: emilyspass
              </Text>
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
  loginButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  hint: {
    marginTop: 16,
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
