# Koa Boilerplate

## Description

A boilerplate to build a Rest API using [`Koa`](https://koajs.com/) and `Typescript`.

## Structure

```text
.
├── app.js                  # Entry point of the application
├── controllers             # Controller functions for handling route logic
│   └── userController.js
├── models                  # Data models representing entities in the application
│   └── userModel.js
├── routes                  # Route definitions
│   └── index.js
├── middleware              # Custom middleware functions
│   └── authMiddleware.js
├── services                # Business logic and utilities
│   └── userService.js
├── config                  # Configuration files (e.g., database configuration)
│   └── config.js
├── utils                   # Utility functions
│   └── helperFunctions.js
├── public                  # Publicly accessible files (e.g., client-side JavaScript, CSS)
│   ├── css
│   └── js
└── views                   # View templates (if using server-side rendering)
    ├── layout
    └── pages
```

## ToDo List

1. https://npmtrends.com/koa-bunyan-vs-koa-logger-vs-koa-logger-winston-vs-koa-morgan-vs-koa-pino-logger-vs-koa-winston-vs-koa2-winston-vs-winston-koa-logger
