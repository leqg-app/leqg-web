import * as React from "react";
import { Helmet } from "react-helmet";

const Seo = () => {
  const title = "Le QG - Trouve ton bar";
  const description =
    "Selon le lieux, l'horaire, la bière et le prix, trouve le bar parfait";
  return (
    <Helmet
      htmlAttributes={{
        lang: "fr",
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content:
            "Selon le lieux, l'horaire, la bière et le prix, trouve le bar parfait",
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
    />
  );
};

export default Seo;
