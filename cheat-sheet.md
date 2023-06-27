1. Initialize project and structure
2. Setup dev environment
3. install express
   - add static middleware
   - add body parser
   - add routes
4. add resources
5. add view folder with ready htmls
6. add express-handlebars view engine
   - install
   - add to express
   - config extention
   - config views folder (only for src)
   - add main layout
   - add partials
   - render home page
   - fix static paths
   - render home page
7. add controllers folder with home controller
8. add database
   - isntall mongoose
   - connect database
9. authentication
   - add user controller
   - add controller to routes
   - fix header nav to login and register and logout
   - render login page
   - render register page
10. add user model
   - add unique index for username
   - validate repeat password
11. modify login and register forms
12. add login and register post methods
13. add user manager
    - validate if user already exists
    - add register method
    - require in user controller
14. Hash password
    - install bcrypt
    - hash password
15. Login
    - Find user by username
    - Validate password with hash
16. Generate jwt token 
    - isntall jsonwebtoken
    - promisify jsonwebtoken (optional)
    - create secret
    - generate token in manager.login
17. Return token in cookie 
    - instal cookie parser
    - config cookie parser

