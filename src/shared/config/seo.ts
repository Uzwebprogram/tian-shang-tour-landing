export const site = {
  url: 'https://tianshantravel.uz',
  name: 'TIAN SHAN TRAVEL',
  phone: '+998787071303',
  instagram: 'https://instagram.com/tian_shan.travel',
  localeDefault: 'uz_UZ',
  ogImage: 'https://tianshantravel.uz/images/tour/almaty-01.png',
} as const;

const ogLocales: Record<string, string> = {
  uz: 'uz_UZ',
  ru: 'ru_RU',
  en: 'en_US',
};

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const sel = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector(sel) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  if (extra) {
    Object.entries(extra).forEach(([key, value]) => el!.setAttribute(key, value));
  }
}

export function applyDocumentSeo(input: {
  locale: string;
  title: string;
  description: string;
  keywords: string;
}) {
  const { locale, title, description, keywords } = input;
  document.documentElement.lang = locale;
  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  });
  upsertMeta('meta[name="author"]', { name: 'author', content: site.name });
  upsertMeta('meta[name="geo.region"]', { name: 'geo.region', content: 'UZ-TK' });
  upsertMeta('meta[name="geo.placename"]', { name: 'geo.placename', content: 'Tashkent' });

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: site.name });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: site.url });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: site.ogImage });
  upsertMeta('meta[property="og:locale"]', {
    property: 'og:locale',
    content: ogLocales[locale] ?? site.localeDefault,
  });

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: site.ogImage });

  upsertLink('canonical', site.url);
  upsertLink('alternate', site.url, { hreflang: 'uz' });
  upsertLink('alternate', site.url, { hreflang: 'ru' });
  upsertLink('alternate', site.url, { hreflang: 'en' });
  upsertLink('alternate', site.url, { hreflang: 'x-default' });
}
