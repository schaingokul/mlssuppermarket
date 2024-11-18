import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerComponent() {
  const [image, setImage] = useState(null);

  // Function to launch the image picker
  const pickImage = async () => {
    // Request permission to access the media library
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If an image is picked, update the state with the image URI
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      {!image && <Text>No image selected</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  imageContainer: {
    marginTop: 20,
    width: 250,
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
