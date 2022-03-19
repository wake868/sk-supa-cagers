import supabase from "$lib/supabase-client";

export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("title, blurb, slug")
    .order("rank", { ascending: true });

  return {
    data,
    error
  };
}

export async function getArticle(slug) {
  const { data, error } = await supabase
    .from("articles")
    .select("title, body")
    .eq("slug", slug)
    .limit(1);

  return {
    data,
    error
  };
}

export async function getPhotosBySlug(slug) {
  const { data, error } = await supabase.storage.from("image").list(slug);

  const photoURLs = [];
  data.forEach((photo) => {
    const { publicURL, error } = supabase.storage
      .from("image")
      .getPublicUrl(`${slug}/${photo.name}`);
    photoURLs.push(publicURL);
  });

  return photoURLs;
}

export default supabase;
