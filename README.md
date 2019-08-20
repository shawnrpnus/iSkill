# iSkill

## Development (LOCAL)
1. In application.properties, ensure that spring.profiles.active=dev when running backend

## Deployment (HEROKU)
### REACT
1. cd to iSkill/
2. git subtree push --prefix frontend heroku master

### SPRING BOOT
run using heroku CLI: heroku plugins:install java (if not done so previously)
1. In application.properties, ensure that spring.profiles.active=prod
1. Maven clean and install
2. heroku deploy:jar target/backend-0.0.1-SNAPSHOT.jar --app iskill-api
