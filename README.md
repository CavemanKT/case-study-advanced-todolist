# Instructions
- under "development mode", the database is named "delvify_case_study", username is "postgres", password is "12345678"

# If you want to set it up in local environment
- Run `$ npm install`
- Run `$ npx sequelize-cli db:create`
- Run `$ npx sequelize-cli db:migrate`
- Run `$ npx sequelize-cli db:seed:all`
- Add `.env` with the following (SECRET_COOKIE_PASSWORD must be at least 32 characters long)
  ```
  SECRET_COOKIE_PASSWORD=[Something Random]
  DATABASE_URL=postgresql://@127.0.0.1/delvify_case_study?statusColor=686B6F&enviroment=local&name=[your_project_name_here]_development&tLSMode=0&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0
  ```

- finally, type "npm run dev" to run the site
