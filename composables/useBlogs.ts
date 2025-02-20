// import { api } from "~/api/api";

// const blogs = ref<any>(null);
// const post = ref<any>(null);

// export function useBlogs() {
//   const fetchBlogs = async (filters = "all") => {
//     try {
//       const response = await api.get("/blogs", {
//         params: {
//           filters,
//         },
//       });
//       blogs.value = response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const fetchBlogsSlug = async (slug: string) => {
//     try {
//       const response = await api.get(`/blogs/${slug}`);
//       post.value = response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return {
//     fetchBlogsSlug,
//     fetchBlogs,
//     blogs,
//     post,
//   };
// }

import { api } from "~/api/api";

const blogs = ref<Record<string, any[]>>({}); // Храним блоги в объекте с ключами фильтров
const post = ref<any>(null);

export function useBlogs() {
  const fetchBlogs = async (filters = "all") => {
    try {
      const response = await api.get("/blogs", {
        params: {
          filters,
        },
      });

      // Создаем массив для конкретного фильтра, если его нет
      if (!blogs.value[filters]) {
        blogs.value[filters] = [];
      }

      blogs.value[filters] = response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchBlogsSlug = async (slug: string) => {
    try {
      const response = await api.get(`/blogs/${slug}`);
      post.value = response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchBlogsSlug,
    fetchBlogs,
    blogs,
    post,
  };
}
