<script lang="ts">
import createComponent from "@/core/component";

import {
  $images, fxFetchImages, fxUploadImage, fxRemoveImage,
} from "@/dashboard/modules/images";
import { BrLoader, BrButton } from "@/shared";

const store = {
  $images,
  $isLoading: fxFetchImages.pending,
};

export default createComponent({
  name: "DashboardImages",

  components: {
    BrLoader,
    BrButton,
  },

  methods: {
    fxRemoveImage,
    fxUploadImage,
  },
}, store);
</script>

<template>
  <div>
    <input
      type="file"
      @change="fxUploadImage($event.target.files[0])"
    >
    <br-loader>
      <ul
        v-if="!$isLoading && $images.length"
        class="row"
      >
        <li
          v-for="image in $images"
          :key="image.id"
          class="col"
        >
          <div class="image">
            <img :src="image.imageUrl">
          </div>

          <div
            class="url"
            :title="image.imageUrl"
          >
            {{ image.imageUrl }}
          </div>

          <br-button
            type="text"
            @click="fxRemoveImage({
              id: image.id, etag: image.etag
            })"
          >
            Видалити
          </br-button>
        </li>
      </ul>
    </br-loader>
  </div>
</template>


<style lang="scss" scoped>
li {
  @include col(4);
}

.image {
  width: 200px;
    height: 200px;
  overflow: hidden;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
.url {
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
