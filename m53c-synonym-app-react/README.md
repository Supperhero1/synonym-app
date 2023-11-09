# Synonym app by Marko Petric

## Setup

* Clone the repo locally
* run `npm install` in both the `frontend` and `backend` folders
* copy the `.env.example` file in the `backend` folder and rename the copy to `.env`. No adjustment of values is needed.
* run `npm start` in both folders.
The server will be available at `http://localhost:3001` and the website will be at `http://localhost:3000`.

## Some notes about the implementation

Both apps are hosted on my website which runs on a digital ocean droplet. That's basically a cheaper EC2 instance with a middleman. The frontend app is served directly, the backend app is running via PM2 to ensure recovery on server restart. Logs for the backend process are available on the server through PM2. Hosting is configured via Nginx.

The task description mentions the following things:

* user-friendly
* testing
* readability
* maintenance
* memory consumption
* performance
* thread safety

## Tests

### Backend

Run `npm run test` in the backend folder. This will first run the unit tests and then the integration tests in parallel.

### Frontend

Frontend tests are pretty basic, just two snapshot tests and a check that the title is rendered. To run them type `npm run test` in the `frontend` folder. If the app is changed the snapshot tests will fail, so you will need to run `npm run test-update-snapshots` to update the snapshots.

## Potential improvements

### Backend
* **Data persistence**

Currently, everything is in-memory. We could make it persistent but there is no rush to do so. The pros would obviously be greater data integrity and the ability to scale horizontally. However, in memory operations are an order of magnitude quicker and an app like this is unlikely to ever need horizontal scaling. Vertical scaling would probably be enough if scaling was ever even required. We could still add a database for crash recovery and dump the state from memory into that DB every so often so that we can retrieve it when we restart the app.

### Frontend

* **Logging**

Currently, we have no way to know what errors are happening on the user side. We might set up a reporting method (see observability bullet point) that will give us insight into any problems the users might be running into.

* **SEO**

No point doing all the SEO related optimizations for a demo app. In fact, web crawlers have been explicitly disabled. However, for a production app this would be crucial.

* **CSS animations**

Omitted because these can be time consuming, especially the fancy ones implemented in JS. However, they can add a bit extra to the website.

* **Tests**

Ideally we would have more tests. Both snapshot tests covering individual components and functional tests covering component and function behaviour.

### Both

* **Caching**

Though all the resources are light-weight, we could implement caching for some resources. This is currently such low impact on this page that it seemed pointless, though.

* **Multiple language support**

If we were to implement support for other languages, we would need to change the data structures on the backend to keep track of the language of each word. We would also need to add a way to communicate the client language, either through query parameters and the request body or through request headers. On the frontend side we would need to have a language library and reference texts through hash maps. For example, instead of writing `<h1>THE SYNONYM APP</h1>` we might write `<h1>{lang[locale].pageTitle}</h1>`. We would add a language selector to the FE alongside logic to initially display the site in the users default language. Error messages coming from the server could no longer be displayed directly, we would need to introduce unique error codes for each one and then get the appropriate locale error message on the client through a map.

* **Observability**

In an actual production app we would want end-to-end request tracing. Any user request should get a trace id on the frontend which would be passed through headers to the backend and used in both places to send traces. A good way to implement this is using open telemetry which is a vendor-agnostic approach. We would set up a open telemetry collector, send traces there and forward them somewhere like honeycomb where they can be browsed and used to follow a request from start to finish to get better insights into what might be going wrong, how long the requests are taking etc.

* **Auth**

Currently, there is no authentication in the app nor is there a need for it at this level of functionality. If we were to make a production app we might add premium features that are accessible to paying customers which would require setting up auth.
