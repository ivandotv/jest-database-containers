# MongoDB and PostgreSQL database testing with Jest and Docker containers

This is an example repository that demonstrates how to test MongoDB and PostgreSQL databases with Docker containers
and Jest.

## How it works

When Jest is started, and before the tests are executed, we create two docker database containers (MongoDB and PostgreSQL) each test file (Jest Worker) gets a new database inside the container.
If the detected OS is Linux, we use the `tmpfs` file system inside the containers which increases the speed of execution since in that case all database data is held in memory.

### Test execution

- Before each test, the database is seeded.
- After each test, the database is cleared.
- When all tests in the file are done, the database is discarded.
- When Jest is done running all the tests, database containers are stopped and removed.

Jest **watch** mode is supported, in that case, everything works that same, but database containers will not be stopped and removed until you exit _watch_ mode.

### Running on Github Actions

Github actions file is included. Default Ubuntu Github Actions image comes with Docker preinstalled so there are no issues running the tests in a continuous integration environment.

## Blog post

I will eventually write a blog post detailing the whole setup process. You can follow me on [Twitter](https://twitter.com/iki_xx) or on [Dev.to](https://dev.to/ivandotv)
to be notified of new blog posts.

I use this setup in my projects, so this repository will be kept up to date.

If you have suggestions on how this process could be improved, feel free to open an issue or pull a request.
