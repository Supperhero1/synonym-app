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

The app is fairly straight forward from the user perspective. They can fetch, add or delete synonyms in an obvious way. It is also responsive for devices down to 300px width which covers pretty much all mobile devices.
* testing

Tests are implemented for both frontend and backend. The frontend tests aren't extensive but are easily improved. Since this is a demo app I haven't added any more tests as that would simply be busywork without showing off anything new.
* readability

Functions were kept small and are separated by function to facilitate better readability. Comments were added where it seemed helpful.
* maintenance

The main thing that helps with maintenance are good logs, however setting up a production grade logging setup is a fair bit of work that doesn't really show off much technical skill. Therefore, I opted to describe what should be done but not actually implement it. There's a section on observability further down that covers how logging (as well as monitoring and tracing) should be implemented to facilitate easy maintenance. Another aspect of maintenance is a good CI/CD pipeline that facilitates quick deploys (blue/green preferably) an auto-scaling setup, disaster recovery etc. This is all in the domain of devops and, though I could implement all of this, it seems out of scope.
* memory consumption

Not much to do here. Memory is mostly a under-the-hood managed resource in JS considering its garbage collected nature. On a high level, the main danger with memory in this app is the synonym hash map growing too large. If I were to make this site for "real", I would certainly set up some alarms (on cloudWatch) monitoring memory usage. It is not expected that this would spike, it would grow slowly so there would be time to react and scale the app vertically. Considering how the synonym map is designed, it won't take up too much memory. I do not expect to hit memory limits for this app unless it were to go into full on use by a lot of users which it clearly won't. If I did expect that I might move the store from memory to Redis, though this would require a refactor and would be considerably slower in terms of performance.
* performance

The app performance is satisfactory. Optimizations could be done for the frontend to reduce time to first contentful paint especially. Decreasing time to first contentful paint would be done though either caching or partial SSR as we know exactly how the site will look at the moment the user opens it. Responsiveness can come later after scripts are downloaded. The backend performance is quite good considering the logic is very simple and done in-memory without need for calls to external services. Optimization there is not needed.
* thread safety

You would have to try REALLY hard to run into thread safety issues with NodeJS. Since I'm not even using worker threads, fairly sure it's actually impossible. Can't have thread safety issues if you only ever use one thread :)

## Tests

### Backend

Run `npm run test` in the backend folder. This will first run the unit tests and then the integration tests in parallel.

### Frontend

Frontend tests are pretty basic, just two snapshot tests and a check that the title is rendered. To run them type `npm run test` in the `frontend` folder. If the app is changed the snapshot tests will fail, so you will need to run `npm run test-update-snapshots` to update the snapshots.

## Potential improvements

### Backend
* **Data persistence**

Currently, everything is in-memory. One thing that should definitely be done if we were to actually use this app is to store the memory data somewhere to ensure persistence after the process resets (new deployments, crashes, instance restarts...). A simple solution would be to save all data to a file in parallel with saving it in memory. The app would always work with the memory data when fetching things, but it would keep the file in sync and would load data from the file when it starts up. We could make it safer than that by moving this backup file off-server or just using Redis instead of our memory. Redis is kinda useful here since it works in memory as well and has good in-built sets. But there is no rush to do so. The pros would obviously be greater data integrity and the ability to scale horizontally. However, in memory operations are an order of magnitude quicker than calling an external Redis database and an app like this is unlikely to ever need horizontal scaling. Vertical scaling would probably be enough if scaling was ever even required. We could still add a database for crash recovery and dump the state from memory into that DB every so often so that we can retrieve it when lose data on the instance.

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

In an actual production app we would want end-to-end request tracing. Any user request should get a trace id on the frontend which would be passed through headers to the backend and used in both places to send traces. A good way to implement this is using open telemetry which is a vendor-agnostic approach. We would set up an open telemetry collector, send traces there and forward them somewhere like honeycomb where they can be browsed and used to follow a request from start to finish to get better insights into what might be going wrong, how long the requests are taking etc. Metrics and logs can also be collected by the OTEL collector, though they need to actually be sent to it, not just to stdout/stderr. Alternatively, we could collect logs from stdout/stderr using a dedicated process, something like Filebat.

* **Auth**

Currently, there is no authentication in the app nor is there a need for it at this level of functionality. If we were to make a production app we might add premium features that are accessible to paying customers which would require setting up auth.
