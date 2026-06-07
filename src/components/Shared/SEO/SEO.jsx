import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const DOMAIN = 'https://v2.daffa-portofolio.workers.dev';

export default function SEO({ 
  title = 'Daffa Najmudin Hanif — Portfolio', 
  description = 'Daffa Najmudin Hanif - Portfolio. Creative designer and full-stack developer showcasing projects, experience, and skills.',
  keywords = 'portfolio, Daffa Najmudin Hanif, developer, designer, react, full stack',
  type = 'website',
  image = '/hero.png' // Fallback OG image
}) {
  const location = useLocation();
  const currentUrl = `${DOMAIN}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${DOMAIN}${image}`;

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
}
