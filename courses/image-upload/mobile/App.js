import React, { Component } from "react";
import { StyleSheet, View, Button, Image, Platform, Text } from "react-native";
import ImagePicker from "react-native-image-picker";

const uploadFile = (url, opts = {}, onProgress) =>
  new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || "get", url);

    Object.keys(opts.headers || {}).forEach(value => {
      xhr.setRequestHeader(value, opts.headers[value]);
    });

    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    }
    xhr.send(opts.body);
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  image: {
    width: 300,
    height: 300
  }
});

export default class App extends Component {
  state = {
    photo: null,
    progress: 0
  };

  handleUploadPhoto = () => {
    const { photo } = this.state;

    const uri =
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "");
    const data = new FormData();
    data.append("avatar", {
      uri,
      // type: "image/jpeg" // or photo.type
      name: photo.fileName
    });
    uploadFile(
      "http://localhost:3000/api/profile/upload",
      {
        method: "post",
        body: data
      },
      event => {
        const progress = Math.floor(event.loaded / event.total) * 100;
        this.setState({ progress });
      }
    ).then(res => {
      console.log(res);
      // this.setState({ progress: 0 });
    });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { photo, progress } = this.state;
    return (
      <View style={styles.container}>
        {photo ? (
          <React.Fragment>
            <Image style={styles.image} source={{ uri: photo.uri }} />
            <Text>{progress}</Text>
            <Button
              title="Upload"
              onPress={this.handleUploadPhoto}
              resizeMode="contain"
            />
          </React.Fragment>
        ) : (
          <Button
            title="Choose Photo"
            onPress={this.handleChoosePhoto}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }
}
