# express-ts-typeorm-starter

This is a project template that I made to make things easier for myself in the future.  The goal is to create something that is easily extensible in the event that a particular project grows in size.

This template features TypeScript, Express, auto reloading, eslint, prettier, TypeORM, and uses JWT for authorization.

I wasn't planning on people using this template, but if it helps you, then by all means, go for it!

If you're going to use this template, you'll need a .env file in the project root (next to package.json) with the following values:

JWT_SECRET=
DB_TYPE= 
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

Example:

JWT_SECRET=ssssh
DB_TYPE=postgres
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=media
DB_PORT=5432