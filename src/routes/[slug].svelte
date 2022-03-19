<script context="module">
  import { getArticle, getPhotosBySlug } from "$lib/supabase-service";

  export async function load({ params }) {
    const article = await getArticle(params.slug);
    console.log(article);

    const photos = await getPhotosBySlug(params.slug);

    return {
      props: {
        article: article.data,
        photos
      }
    };
  }
</script>

<script>
  export let article;
  export let photos;
  console.log(photos);
</script>

<a
  sveltekit:prefetch
  class="py-2 px-4 bg-red-800 rounded text-white hover:opacity-70"
  href="/"
>
  BACK
</a>

<div class="bg-white mt-5 p-3 rounded">
  <h2 class="font-bold text-lg">{article[0].title}</h2>
  <hr class="mb-5" />
  <div class="text-stone-600">
    {@html article[0].body}
  </div>
  <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-1">
    {#each photos as photo}
      <a href={photo} target="_blank">
        <img src={photo} alt="basketball" />
      </a>
    {/each}
  </div>
</div>
