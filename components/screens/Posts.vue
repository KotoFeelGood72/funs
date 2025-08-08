<template>
  <div class="posts">
    <div class="container">
      <div class="posts-head">
        <h3>Блог</h3>
        <btn
          name="Смотреть все"
          icon="mynaui:arrow-right"
          theme="transparent"
          @click="router.push('/articles')"
        />
      </div>
      <div class="post__w">
        <ul class="posts-grid">
          <li v-for="(item, i) in posts" :key="'home-post-item-' + i">
            <Post :post="item" />
          </li>
        </ul>
        <div class="adv">
          <!-- Yandex.RTB R-A-14701543-1 -->
          <div id="yandex_rtb_R-A-14701543-1">
            <!-- Fallback content for development -->
            <div
              style="
                background: #f0f0f0;
                padding: 20px;
                text-align: center;
                border: 1px solid #ddd;
              "
            >
              <p>Yandex Ad Placeholder</p>
              <p>Block ID: R-A-14701543-1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Post from "../ui/card/Post.vue";
import btn from "../ui/buttons/btn.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

// Type declarations for Yandex global variables
declare global {
  interface Window {
    yaContextCb: any[];
    Ya: {
      Context: {
        AdvManager: {
          render: (config: any) => void;
        };
      };
    };
  }
}

defineProps<{
  posts: any;
}>();

const router = useRouter();

onMounted(() => {
  // Initialize Yandex.RTB ad
  if (window.yaContextCb && window.Ya) {
    window.yaContextCb.push(() => {
      try {
        window.Ya.Context.AdvManager.render({
          blockId: "R-A-1234567-1", // Test block ID
          renderTo: "yandex_rtb_R-A-14701543-1",
          type: "feed",
        });
      } catch (error) {
        console.log("Yandex ad failed to load:", error);
        // You can add fallback content here if needed
      }
    });
  }
});
</script>

<style scoped lang="scss">
.post__w {
  @include flex-start;
  align-items: flex-start;
  gap: 2.4rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 1rem;
  }
}
.posts {
  background-color: $blue;
  color: $white;
}

.posts-head {
  @include flex-space;
  margin-bottom: 3.2rem;
  h3 {
    font-size: 3.2rem;
  }

  :deep(.btn) {
    @include bp($point_2) {
      width: auto;
    }
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 3.2rem;
  max-width: 118.8rem;

  @include bp($point_2) {
    max-width: 100%;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
}

.adv {
  @include flex-start;
  flex-direction: column;
  gap: 3.2rem;

  @include bp($point_2) {
    flex-direction: row;
    gap: 1rem;
  }
  div {
    width: 100%;
    height: 100%;
    @include flex-center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
