import React from "react";
import { Image, StyleSheet, Text, View, TextInput, Button, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useForm, Controller } from "react-hook-form";

type RootStackParamList = {
  PublishScreen: any;
};

type Props = NativeStackScreenProps<RootStackParamList, "PublishScreen">;

export default function ImagesScreen({ route }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
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
          <View style={styles.fixToText}>
            <Text style={styles.label}>Race</Text>
            <Text style={styles.label}>Catégorie</Text>

          </View>
          <View style={styles.fixToText}>
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
                  placeholder={'#breed'}
                />
              )}
              name="Race"
              defaultValue=""
            />

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
                  placeholder={'#category'}
                />
              )}
              name="Category"
              defaultValue=""
            />
          </View>

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
