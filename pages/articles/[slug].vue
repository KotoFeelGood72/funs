<template>
  <section class="articles" v-if="post">
    <Hero :title="false" class="articles-filter" />
    <div class="articles_main">
      <div class="container">
        <div class="articles__col">
          <bread class="breadcrums" />
          <div class="articles__head">
            <h1>{{ post.title }}</h1>
            <div class="articles_timeread">
              3 мин <Icon name="famicons:time-outline" />
            </div>
          </div>
          <div class="articles_img">
            <img src="@/assets/img/single.png" />
          </div>
          <div class="articles__row">
            <div class="articles__content">
              <h2>Заголовок h2</h2>
              <div class="articles_txt">
                <h3>Подзаголовок</h3>
                <p>
                  Прежде всего, синтетическое тестирование предоставляет широкие
                  возможности для существующих финансовых и административных
                  условий. С другой стороны, внедрение современных методик
                  способствует подготовке и реализации первоочередных
                  требований. Противоположная точка зрения подразумевает, что
                  элементы политического процесса призывают нас к новым
                  свершениям, которые, в свою очередь, должны быть призваны к
                  ответу. Следует отметить, что выбранный нами инновационный
                  путь позволяет выполнить важные задания по разработке
                  прогресса профессионального сообщества. Наше дело не так
                  однозначно, как может показаться: начало повседневной работы
                  по формированию позиции в значительной степени обусловливает
                  важность переосмысления внешнеэкономических политик. Внезапно,
                  ключевые особенности структуры проекта формируют глобальную
                  экономическую сеть и при этом — ограничены исключительно
                  образом мышления. Разнообразный и богатый опыт говорит нам,
                  что дальнейшее развитие различных форм деятельности влечет за
                  собой процесс внедрения и модернизации системы обучения
                  кадров, соответствующей насущным потребностям. В целом,
                  конечно, существующая теория не оставляет шанса для
                  первоочередных требований. Равным образом, современная
                  методология разработки предоставляет широкие возможности для
                  инновационных методов управления процессами. В рамках
                  спецификации современных стандартов, акционеры крупнейших
                  компаний превращены в посмешище, хотя само их существование
                  приносит несомненную пользу обществу. Приятно, граждане,
                  наблюдать, как реплицированные с зарубежных источников,
                  современные исследования освещают чрезвычайно интересные
                  особенности картины в целом, однако конкретные выводы,
                  разумеется, подвергнуты целой серии независимых исследований.
                  Кстати, сторонники тоталитаризма в науке лишь добавляют
                  фракционных разногласий и ограничены исключительно образом
                  мышления. А ещё некоторые особенности внутренней политики
                  будут заблокированы в рамках своих собственных рациональных
                  ограничений. Мы вынуждены отталкиваться от того, что
                  социально-экономическое развитие выявляет срочную потребность
                  экспериментов, поражающих по своей масштабности и
                  грандиозности. Разнообразный и богатый опыт говорит нам, что
                  граница обучения кадров способствует повышению качества
                  поставленных обществом задач. Противоположная точка зрения
                  подразумевает, что независимые государства и по сей день
                  остаются уделом либералов, которые жаждут быть представлены в
                  исключительно положительном свете. Значимость этих проблем
                  настолько очевидна, что высококачественный прототип будущего
                  проекта играет важную роль в формировании новых.
                </p>
              </div>
              <btn name="Поделиться" icon="share-2" theme="white" />
            </div>
            <div class="articles_aside">
              <sectionHead title="Новые посты" link="/" />
              <div class="post__new">
                <Post
                  v-for="(item, i) in blogs"
                  :key="'post-item-' + i"
                  :post="item"
                />
              </div>
            </div>
          </div>
          <div class="articles__additionaly">
            <div class="grid_w">
              <sectionHead title="Избранные посты" link="/" />
              <div class="grid-3">
                <Post
                  v-for="(item, i) in blogs"
                  :key="'post-item-' + i"
                  :post="item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import btn from "~/components/ui/buttons/btn.vue";
import sectionHead from "~/components/ui/section-head.vue";
import Post from "~/components/ui/card/Post.vue";
import bread from "~/components/ui/bread.vue";
import Hero from "~/components/screens/Hero.vue";
import { useBlogs } from "~/composables/useBlogs";
import { useRoute } from "vue-router";

const route = useRoute();

const { fetchBlogsSlug, post, fetchBlogs, blogs } = useBlogs();

onMounted(async () => {
  await fetchBlogsSlug(route.params.slug.toString());
  await fetchBlogs("new");
});
</script>

<style scoped lang="scss">
.articles-filter {
  padding: 8rem 0;
}

.articles_main {
  background-color: $white;
  border-radius: 3.2rem;
  padding: 3.2rem 0;

  h1 {
    font-size: 6.4rem;
  }
}

.articles_timeread {
  @include flex-start;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: $dark;
}

.articles_img {
  width: 100%;
  height: auto;
  border-radius: 2.4rem;
  overflow: hidden;
  img {
    object-fit: cover;
  }
}

.articles__col {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}

.articles__row {
  @include flex-start;
  align-items: flex-start;
  gap: 13.8rem;
}
.articles__content {
  max-width: 99.4rem;

  & > h2 {
    margin-bottom: 1.6rem;
  }

  :deep(.btn) {
    display: inline-flex;
  }
}

.articles_txt {
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0;
  }

  p,
  ul,
  li {
    margin: 1rem 0;
  }
}

.articles_aside,
.articles__additionaly {
  :deep(.section-head) {
    margin-bottom: 1.6rem;
  }
}

.post__new {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
</style>
