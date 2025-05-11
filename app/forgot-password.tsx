import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email đặt lại mật khẩu đã được gửi!");
      setError(""); // Clear any previous errors
    } catch (err: any) {
      setError("Vui lòng nhập email hợp lệ.");
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <TextInput
        placeholder="Nhập email của bạn"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <View style={styles.button}>
        <Button
          title="Gửi Email Đặt Lại Mật Khẩu"
          onPress={handleForgotPassword}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Quay Lại Đăng Nhập"
          onPress={() => router.push("/login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  message: {
    color: "green",
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    width: "100%",
  },
});
