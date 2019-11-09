import Document, { Head, Main, NextScript } from "next/document";

// service worker
// https://developers.google.com/web/fundamentals/primers/service-workers
// it will give us native app experience. if the device not connected to the interenet still user can able to browse the app past visited link I think.
// plugin npm i sw-precache-webpack-plugin
// we need to configure webpack manually after this under next.config.js

// for pregessive app to get app like experience
// to generate menifest data head to
// https://tomitm.github.io/appmanifest/

// to gerate icon
// https://app-manifest.firebaseapp.com/

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="manifest" href="/static/manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="hacker-news" />
          <meta name="apple-mobile-web-app-title" content="hacker-news" />
          <meta name="theme-color" content="#f60" />
          <meta name="msapplication-navbutton-color" content="#f60" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/static/icons/icon-512x512.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="512x512"
            href="/static/icons/icon-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/static/icons/icon-192x192.png"
          />
        </Head>
        <bosy>
          <Main />
          <NextScript />
        </bosy>
      </html>
    );
  }
}
