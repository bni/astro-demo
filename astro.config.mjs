import { defineConfig } from 'astro/config';
import aws from "astro-sst";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [vue(), tailwind()]
});
