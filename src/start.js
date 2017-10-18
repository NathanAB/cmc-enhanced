chrome.storage.sync.get({
  darkTheme: true,
}, (settings) => {
  var link = document.createElement( "link" );
  if (settings.darkTheme) {
    // document.body.classList.add('dark');
    document.documentElement.classList.add("dark");
    link.href = "style_dark.css";
  }
  else {
     link.href = "style_light.css";
  }
  link.type = "text/css";
  link.rel = "stylesheet";
  link.media = "screen,print";
  document.getElementsByTagName( "head" )[0].appendChild( link );
  console.log('css injected');
});

