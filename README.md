# cypress-deptagency-qa-assessment

## Info

Project covers test cases for two websites:

### http://the-internet.herokuapp.com

1. A user can login via Basic Auth
2. A user can see the broken image
3. A user can upload a file
4. A user can share geolocation
5. A user can login via Form Authentication
6. A user can logout from Form Authentication
7. A user can not login to Form Authentication with invalid credential

### http://automationpractice.com

1. A user can make a purchase when logged in
2. A user can search by a product
3. A user can compare products
4. A user can contact customer service
5. A user can a product to wishlist

## Run

Run in desktop mode

```shell
npm install
npm run cypress:run-desktop
```

Run in mobile mode

```shell
npm install
npm run cypress:run-mobile
```

## Reports

HTML reports are generated to **cypress/reports** folder. 
[cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) library is used for reporting.
