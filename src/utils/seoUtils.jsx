// SEO utilities for optimizing page content
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Creates a standard SEO component with meta tags for a page
 * @param {Object} props - SEO properties
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Comma-separated keywords
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogType - Open Graph type (default: website)
 * @param {string} props.twitterCard - Twitter card type (default: summary_large_image)
 * @returns {React.Component} Helmet component with SEO tags
 */
export const SEO = ({ 
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://prguest.com/images/og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}) => (
  <Helmet>
    {/* Primary Meta Tags */}
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <link rel="canonical" href={canonical} />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />

    {/* Twitter */}
    <meta property="twitter:card" content={twitterCard} />
    <meta property="twitter:url" content={canonical} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={ogImage} />
  </Helmet>
);

/**
 * Creates structured data for better search engine understanding
 * @param {Object} props - Schema properties
 * @param {string} props.type - Schema.org type
 * @param {Object} props.data - Schema data object
 * @returns {React.Component} Script tag with JSON-LD data
 */
export const SchemaMarkup = ({ type, data }) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

/**
 * Creates breadcrumb structured data
 * @param {Array} items - Breadcrumb items with name and url properties
 * @returns {React.Component} Script tag with breadcrumb JSON-LD data
 */
export const BreadcrumbSchema = ({ items }) => {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.url
  }));

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

/**
 * Generate a URL-friendly slug from a string
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};