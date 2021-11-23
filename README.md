# Instructions
- Clone and rename folder `$ git clone git@github.com:dented-academy/next-starter.git [your_project_name_here]`
- Find and rename all instance of `[your_project_name_here]` to your project name
- Run `$ npm install`
- Run `$ npx sequelize-cli db:create`
- Run `$ npx sequelize-cli db:migrate`
- Run `$ npx sequelize-cli db:seed:all`
- Add `.env` with the following (SECRET_COOKIE_PASSWORD must be at least 32 characters long)
  ```
  SECRET_COOKIE_PASSWORD=[Something Random]
  DATABASE_URL=postgresql://@127.0.0.1/[your_project_name_here]_development?statusColor=686B6F&enviroment=local&name=[your_project_name_here]_development&tLSMode=0&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0
  ```
- Run `$ git remote remove origin`
- Create a new repo and add the repo ssh link to remote
- Run `$ git push origin master`

# Debug
In Chrome, go to `chrome://inspect`
Click on the appropriate Remote Target
