# Synonym app by Marko Petric

## Potential improvements

### Backend
* **Data persistence**

Currently, everything is in-memory. We could make it persistent but there is no rush to do so. The pros would obviously be greater data integrity and the ability to scale horizontally. However, in memory operations are an order of magnitude quicker and an app like this is unlikely to ever need horizontal scaling. Vertical scaling would probably be enough if scaling was ever even required. We could still add a database for crash recovery and dump the state from memory into that DB every so often so that we can retrieve it when we restart the app.

### Frontend
* **SEO**

No point doing all the SEO related optimizations for a demo app. In fact, web crawlers have been explicitly disabled. However, for a production app this would be crucial.

* **CSS animations**

Omitted because these can be time consuming, especially the fancy ones implemented in JS. However, they can add a bit extra to the website.

### Both

* **Multiple language support**

If we were to implement support for other languages, we would need to change the data structures on the backend to keep track of the language of each word. We would also need to add a way to communicate the client language, either through query parameters and the request body or through request headers. On the frontend side we would need to have a language library and reference texts through hash maps. For example, instead of writing `<h1>THE SYNONYM APP</h1>` we might write `<h1>{lang[locale].pageTitle}</h1>`. We would add a language selector to the FE alongside logic to initially display the site in the users default language. Error messages coming from the server could no longer be displayed directly, we would need to introduce unique error codes for each one and then get the appropriate locale error message on the client through a map.
