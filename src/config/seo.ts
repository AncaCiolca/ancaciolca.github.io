import { getSeoGlobal, getSeoHome, getSeoPoems, getSeoAbout } from "@/lib/seoData";

const globalSeo = getSeoGlobal();

export const SITE_URL = globalSeo.siteUrl;

export const SITE_NAME = globalSeo.siteName;

export const DEFAULT_DESCRIPTION = globalSeo.defaultDescription;

export const OG_LOCALE = globalSeo.ogLocale;

export const FAVICON_PATH = globalSeo.favicon || "/favicon.ico";

export const getHomeSeo = getSeoHome;
export const getPoemsSeo = getSeoPoems;
export const getAboutSeo = getSeoAbout;
