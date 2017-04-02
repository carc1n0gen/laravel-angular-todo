# Install

`git clone https://github.com/carc1n0gen/spa-laravel-todo.git path/to/install`

`cd path/to/install`

`composer install`

`cp .env.example .env` <- Modify and change DB settings

`php artisan migrate`

## Development

To make changes do the JS code you'll want to run `npm run dev` to watch for changes made to the assets.

## Prod

To build minified assets run `npm run production`

![Imgur](http://i.imgur.com/UTtiIpB.png)
