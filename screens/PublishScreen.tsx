import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";

type RootStackParamList = {
  PublishScreen: any;
};

type Props = NativeStackScreenProps<RootStackParamList, "PublishScreen">;

type CatInput = {
  name: string;
  city: string;
  breed: string;
  category: string;
  file: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export default function ImagesScreen({ route }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedBreed, setSelectedBreed] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const { manifest } = Constants;

  const getPositionByAddress = async ({
    address,
    city,
  }: {
    address: string;
    city: string;
  }) => {
    return Location.geocodeAsync(`${address} ${city}`);
  };

  const uploadCatData = async ({
    name,
    file,
    category,
    breed,
    city,
    description,
    coordinates,
  }: CatInput) => {
    const body = {
      query: `
    mutation {
      createCat(cat: {
        name: "${name}",
        file: "${file}", 
        category: "${category}", 
        breed: "${breed}", 
        city: "${city}", 
        coordinates: {longitude: ${coordinates.longitude}, latitude: ${coordinates.latitude}},
        description: "${description}
      }) {
        _id
        url
        coordinates {
          longitude
          latitude
        }
        createdAt
      }
    }
    `,
    };
    console.log(body);
    try {
      await axios({
        url: `http://${manifest.debuggerHost
          ?.split(`:`)
          .shift()
          .concat(`:4000`)}/graphql`,
        method: "post",
        data: body,
      });
    } catch (error: any) {
      Alert.alert("Upload error", error.message, [{ text: "OK" }]);
    }
  };

  const onSubmit = async (data) => {
    const coordinates = await getPositionByAddress({
      address: data.Address,
      city: data.City,
    });
    await uploadCatData({
      name: data.Name,
      file: route.params.picture.base64,
      category: data.Category || "cute",
      breed: data.Race || "bengal",
      city: data.City,
      description: data.Description,
      coordinates: coordinates[0],
    });
  };

  return (
    <>
      <ScrollView>
        <Image
          style={{
            resizeMode: "contain",
            height: 300,
          }}
          source={{
            uri: route.params !== undefined && route.params.picture.uri,
          }}
        />
        <View style={styles.container}>
          <Text style={styles.label}>Nom</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={"Nom du chat"}
              />
            )}
            name="Name"
            defaultValue=""
          />
          {errors.Name && <Text>This is required.</Text>}
          <Text style={styles.label}>Race</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                style={styles.input}
                itemStyle={publication.input}
                prompt={"Race du chat"}
                selectedValue={selectedBreed}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedBreed(itemValue)
                }
              >
                <Picker.Item label="Maine Coon" value="mainCoon" />
                <Picker.Item label="Bengal" value="bengal" />
                <Picker.Item label="Siamois" value="siamois" />
                <Picker.Item label="Munchkin" value="munchkin" />
              </Picker>
            )}
            name="Race"
            defaultValue=""
          />
          <Text style={styles.label}>Catégorie</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                style={styles.input}
                itemStyle={publication.input}
                prompt={"Catégorie"}
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }
              >
                <Picker.Item label="Funny" value="funny" />
                <Picker.Item label="Cute" value="cute" />
                <Picker.Item label="Sleeping" value="sleeping" />
              </Picker>
            )}
            name="Category"
            defaultValue=""
          />
          <Text style={styles.label}>Adresse</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={"Rue"}
              />
            )}
            name="Address"
            defaultValue=""
          />

          <Text style={styles.label}>Ville</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={"Ville"}
              />
            )}
            name="City"
            defaultValue=""
          />

          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={"Description"}
              />
            )}
            name="Description"
            defaultValue=""
          />
          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            color="#841584"
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    backgroundColor: "white",
    color: "black",
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    padding: 25,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "max",
  },
});
