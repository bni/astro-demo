import { defineConfig } from 'astro/config';
import aws from "astro-sst";
import vue from "@astrojs/vue";

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [vue()]
});
