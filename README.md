# FriendMap

**Maps with Friends**: a small web app that puts your friends' locations on a Google Map and helps you find somewhere to meet.

## Features

- Add people by name and latitude/longitude. Each person appears as a marker, and a heatmap shows where the group is clustered.
- Turn individual people on or off to change who is included.
- Locations are saved in a cookie and encoded in the URL, so you can share a map by sharing the link.
- **Restaurants** searches the area between the enabled people (using the Google Places API) and lists meetup picks in a sidebar.

## Tech

- [deck.gl](https://deck.gl/) (`IconLayer`, `HeatmapLayer`) drawn over Google Maps through `@deck.gl/google-maps`
- `@googlemaps/js-api-loader` for the Maps and Places libraries
- [Vite](https://vite.dev/) to bundle everything into one standalone file

## Project layout

| File | Purpose |
| --- | --- |
| `index.html` | Page markup and controls |
| `app.js` | Map setup, layers, people controls, cookie/URL state |
| `restaurants.js` | Restaurant search zones, Places queries, sidebar results |
| `style.css` | Styles |
| `assets/app.js` | Bundled build output (committed, loaded by `index.html`) |

## Getting started

You need Node.js 26.12+ (see `.nvmrc`).

```sh
npm install
npm run build
```

The build writes `assets/app.js`. Serve the project folder with any static file server, for example:

```sh
npx serve .
```

## Configuration

The Google Maps API key and Map ID are set at the top of `app.js` (`GOOGLE_MAPS_API_KEY`, `GOOGLE_MAP_ID`), along with the default map centre. The key needs the Maps JavaScript API and Places API (New) enabled. Restrict it to your domain in the Google Cloud console, because it ships in the client bundle.
