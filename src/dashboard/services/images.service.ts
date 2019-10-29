
/* eslint-disable camelcase */
import http from "@/services/http.service";
import { RemovePayload } from "./types";

type Image = {
  imageUrl: string;
  response: {
    format: string;
    etag: string;
    url: string;
    tags: string;
    resource_type: string;
    height: string;
    signature: string;
    public_id: string;
    placeholder: string;
    secure_url: string;
    version: string;
    bytes: string;
    created_at: string;
    type: string;
    original_filename: string;
    width: string;
  };
  url: string;
  imageResourceMembershipUrl: string;
  etag: string;
  created: number;
  updated: number;
  id: string;
};

async function fetchImages() {
  const { data } = await http.get<Image[]>("/image");
  return data;
}

async function uploadImage(image: Blob) {
  const formData = new FormData();
  formData.append("image", image);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const { data } = await http.post<Image>("/image/upload", formData, { headers });
  return data;
}

async function removeImage({ id, etag }: RemovePayload) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  await http.delete(`/image/${id}`, { headers });
  return id;
}

const imagesService = {
  removeImage,
  uploadImage,
  fetchImages,
};

export {
  imagesService,
  Image,
};
