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
            <p>
              Информация, размещенная на сайте, не является публичной офертой
            </p>
            <ul class="socials">
              <li>
                <a href="#" target="_blank">
                  <Icon name="f:tg" />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <Icon name="f:tel" />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <Icon name="f:vk" />
                </a>
              </li>
            </ul>
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
                <Icon name="f:right" />
              </div>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const nav = ref<any>([
  { name: "Личный кабинет", link: "/" },
  { name: "Забронировать авиабилет", link: "/" },
  { name: "Забронировать отель", link: "/" },
  { name: "Забронировать ETA", link: "/" },
  { name: "О сервисе", link: "/" },
  { name: "Условия использования", link: "/" },
  { name: "Условия использования", link: "/" },
]);
</script>

<style scoped lang="scss"></style>
