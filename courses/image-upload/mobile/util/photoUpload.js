import { Platform } from "react-native";

export const createFormData = (photo, body = {}) => {
  const uri =
    Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "");

  const data = new FormData();
  data.append("photo", {
    uri,
    name: photo.fileName
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const uploadFileWithProgress = (url, opts = {}, onProgress) =>
  new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || "get", url);

    Object.keys(opts.headers || {}).forEach(value => {
      xhr.setRequestHeader(value, opts.headers[value]);
    });

    xhr.onload = e => {
      res(e.target.response);
    };
    xhr.onerror = rej;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    }
    xhr.send(opts.body);
  });
