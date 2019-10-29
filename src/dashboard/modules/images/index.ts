import { restore, createEffect } from "effector";

import { imagesService, Image } from "@/dashboard/services/images.service";
import { RemovePayload } from "@/dashboard/services/types";

const fxFetchImages = createEffect<void, Image[]>("fetch all images", {
  handler: imagesService.fetchImages,
});

const fxUploadImage = createEffect<Blob, Image>("upload image", {
  handler: imagesService.uploadImage,
});

const fxRemoveImage = createEffect<RemovePayload, string>("remove image", {
  handler: imagesService.removeImage,
});

const $images = restore(fxFetchImages, []);

$images
  .on(fxUploadImage.done, (images, { result: image }) => [image, ...images])
  .on(fxRemoveImage.done, (images, { result: id }) => images.filter(image => image.id !== id));

export {
  fxFetchImages,
  fxUploadImage,
  fxRemoveImage,
  $images,
};
