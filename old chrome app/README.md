<h1>SocialTunes</h1>
A more social way to tune.


<h2>Setting up the Chrome app for development</h2>
<ol>
  <li>Go to chrome://extensions in Chrome</li>
  <li>Click "Load unpacked extension"</li>
  <li>Select the project folder</li>
</ol>

<h2>Structure</h2>
`background.js` is run in the background, so music indexing should be done there.
To connect to devices on the network, maybe we can try setting up a TCP server: https://developer.chrome.com/apps/app_network#tcpServer
The MediaGalleries API is probably a ghood way to get access to a list of songs. https://developer.chrome.com/apps/mediaGalleries

The `app` folder is where the front end is run from

In general, here are the APIs we can use: https://developer.chrome.com/apps/api_index