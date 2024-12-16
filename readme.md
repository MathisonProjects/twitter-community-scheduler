# Twitter Community Scheduler

## Description
The Twitter Community Scheduler is a simple tool to allow people to schedule a number of posts by simply setting a few environment variables and defining the community you are posting to.

## Technology
- NodeJs
- Javascript

## Set Up

```
$ git clone https://github.com/MathisonProjects/twitter-community-scheduler twitter-community-scheduler
$ cd twitter-community-scheduler
$ cp .env.local .env
$ npm install
```

Update your environment variables. You'll be able to grab most of your variables from the Twitter Dev Dashboard.

https://developer.x.com/en/portal/dashboard

You may grab your Community ID in on Twitter (X) and use the number sequence.

## Run

```
$ npm run start
```

Use military time to define when it is to post, using your local machine's respective timestamp as reference.

### Developed By

Jacob Mathison
