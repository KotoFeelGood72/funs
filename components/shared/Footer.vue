<template>
  <footer class="footer">
    <div class="container">
      <div class="footer_logo">
        <img src="~/assets/img/footer-logo.svg" />
      </div>
      <div class="footer_main">
        <div class="footer_info">
          <div class="footer__top">
            <div class="footer_mini__logo">
              <img src="~/assets/img/fb.svg" />
            </div>
            <p>© 1996-2024 Funbooking</p>
          </div>
          <div class="footer_bottom">
            <p>Информация, размещенная на сайте, не является публичной офертой</p>
            <ul class="socials">
              <li>
                <a href="#" target="_blank">
                  <Icon name="fa-brands:telegram-plane" :size="32" />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <Icon name="mingcute:phone-fill" :size="32" />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <Icon name="basil:vk-solid" :size="32" />
                </a>
              </li>
            </ul>
            <div class="payment">
              <img src="@/assets/img/payment.png" alt="" />
            </div>
            <div class="ur_info">
              <p>ООО "РЕД МЕД"</p>
              <p>Юр. Адрес: 344039, РОСТОВ-НА-ДОНУ, ЗООЛОГИЧЕСКАЯ УЛ., 59</p>
            </div>
          </div>
        </div>
        <div class="footer__navigation">
          <nav>
            <NuxtLink
              v-for="(item, i) in nav"
              :key="'footer-nav-item-' + i"
              :to="item.link"
            >
              <p>{{ item.name }}</p>
              <div class="nav-icon">
                <Icon name="mynaui:arrow-right" />
              </div>
            </NuxtLink>
          </nav>
        </div>
      </div>
      <div class="footer__ur__info">
        <p>ИНН/КПП 6165234690/616501001, ОГРН 1226100033257</p>
        <a href="mailto:info@funbooking.ru">info@funbooking.ru</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const nav = ref<any>([
  { name: "Личный кабинет", link: "/profile" },
  { name: "Отели для визы без полной оплаты", link: "/hotels" },
  { name: "Оплатить E-Visa и ЕТА российской картой", link: "/eta" },
  { name: "Забронировать авиабилет", link: "/air" },
  {
    name: "Политика в отношении обработки персональных данных",
    link: "/privacy",
  },
  { name: "Политика в отношении cookie-файлов", link: "/coockies" },
  { name: "Правила использования сервиса Funbooking", link: "/rules" },
]);
</script>

<style scoped lang="scss">
.footer {
  padding: 3.2rem;
  // position: relative;
  background-color: $white;
  border-top-left-radius: 3.2rem;
  border-top-right-radius: 3.2rem;

  @include bp($point_2) {
    padding: 6rem 0 2rem 0;
  }
  &:after {
    position: absolute;
    left: 0;
    top: 4.8rem;
    height: 9.6rem;
    width: 100%;
    content: "";
    background-color: $white;
    opacity: 0.8;
    border-top-left-radius: 3.2rem;
    border-top-right-radius: 3.2rem;
  }
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    height: 9.6rem;
    width: 100%;
    content: "";
    background-color: $white;
    opacity: 0.2;
    border-top-left-radius: 3.2rem;
    border-top-right-radius: 3.2rem;
  }
}

.footer_main {
  @include flex-start;
  gap: 3.2rem;
  margin-bottom: 2rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 2rem;
  }
}

.footer_info {
  background-color: $blue;
  padding: 1.6rem 3.2rem;
  border-radius: 3.2rem;
  color: $white;

  @include bp($point_2) {
    order: 1;
    width: 100%;
  }
}

.footer_mini__logo {
  margin-bottom: 1.6rem;
}

.footer__top {
  font-size: 1.8rem;
  // min-height: 13.6rem;

  @include bp($point_2) {
    min-height: auto;
  }
}

.footer_bottom {
  p {
    margin-bottom: 3.2rem;
    font-size: 1.4rem;
    color: $light;
    max-width: 28.4rem;
  }
}

.socials {
  @include flex-start;
  gap: 2.4rem;
  a {
    color: $white;
  }
}

.footer__navigation {
  width: 100%;
  border: 0.1rem solid $light;
  border-radius: 3.2rem;
  overflow: hidden;
  @include bp($point_2) {
    order: 0;
  }
  nav {
    width: 100%;
    a {
      @include flex-space;
      padding: 1.22rem 3.2rem;
      font-family: $font_2;
      line-height: 100%;

      &:hover {
        background-color: $light;
      }
      &:not(:last-child) {
        border-bottom: 0.1rem solid $light;
      }
    }
  }
}

.footer_logo {
  position: relative;
  z-index: 22;

  @include bp($point_2) {
    margin-bottom: 3rem;
  }
  img {
    width: 100%;
  }
}

.payment {
  max-width: 15rem;
  margin: 2rem 0 0 0;
  img {
    width: 100%;
  }
}

.footer__ur__info {
  @include flex-space;
  gap: 2rem;
  flex-wrap: wrap;
}

.ur_info {
  & > p {
    &:nth-child(1) {
      margin-bottom: 1rem;
      margin-top: 2rem;
    }
    &:nth-child(2) {
      margin-bottom: 0;
    }
  }
}
</style>
