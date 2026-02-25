// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // 1. Базовый URL (важно для GitHub Pages)
  // Если сайт будет в корне: base: '/'
  // Если в подпапке репозитория: base: '/имя-репозитория/'
  base: "/three-js-exercises/", // относительные пути - safest option

  // 2. НАСТРОЙКА МНОГОСТРАНИЧНОСТИ - указываем все HTML файлы
  build: {
    rollupOptions: {
      input: {
        // Главная страница
        main: resolve(__dirname, "index.html"),
        // Страница с 3D контентом
        "3d-page": resolve(__dirname, "3d-page.html"),
        exercises: resolve(__dirname, "проба/exercises.html"),
        // Если есть другие страницы
        // about: resolve(__dirname, 'about.html'),
        // contacts: resolve(__dirname, 'contacts.html')
      },
    },
  },

  // 3. Поддержка 3D моделей
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.bin", "**/*.png"],
});
