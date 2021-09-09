import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';

type RootStackParamList = {
  PublishScreen: any;
};

type Props = NativeStackScreenProps<RootStackParamList, "PublishScreen">;

export default function ImagesScreen({ route }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const [selectedBreed, setSelectedBreed] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <>
      <ScrollView>
        <Image
          style={{
            resizeMode: "contain",
            height: 300,
          }}
          source={{ uri: route.params !== undefined && route.params.picture.uri }}
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
                placeholder={'Nom du chat'}
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
                prompt={'Race du chat'}
                selectedValue={selectedBreed}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedBreed(itemValue)
                }>
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
                prompt={'Catégorie'}
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }>
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
                placeholder={'Rue'}
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
                placeholder={'Ville'}
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
                placeholder={'Description'}
              />
            )}
            name="Description"
            defaultValue=""
          />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} color="#841584" />
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
    backgroundColor: 'white',
    color: 'black'
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    padding: 25,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "max",
  },
});
