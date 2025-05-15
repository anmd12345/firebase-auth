import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/src/services/firebaseConfig"; 

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); 
    } else {
      router.replace("/login"); 
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      router.replace("/login"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      {user && (<Text style={styles.text}>Welcome, {user.email}</Text>)}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#d63384",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
