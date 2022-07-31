# Documentation

#### Docs on how to use our API

## OAuth

### 1) Make a new OAuth App on our website

### 2) Redirect your user to the following page for authorization -

```
https://minet-metaverse.vercel.app/oauth/authorize?clientId={{clientId}}
```

#### Parameters -

##### 1) clientId - The Client ID for your application. Can be found in the OAuth Apps section on the website.

### 3) You will be redirected to the callback url you provided with a `code` in URL Query Parameters as such -

` callbackUrl/?code={{code}}`

### 4) Send a request with the code, clientId and clientSecret to the following URL -

```
http://metahub-api.herokuapp.com/auth/access_token?code={{code}}&clientId={{clientId}}&clientSecret={{clientSecret}}
```

#### Parameters -

##### 1) code - The code received in Step 3

##### 2) clientId - The Client ID for your application. Can be found in the OAuth Apps section on the website.

##### 3) clientSecret - The Client Secret for your application. Can be found in the OAuth Apps section on the website.

### Using the returned Access Token

#### To send authenticated requests, set an `Authorization` header with the access token as its value. For eg -

```
curl -H "Authorization: ACCESS-TOKEN" http://metahub-api.herokuapp.com/auth/me
```

## Report API

### Report a user

#### Send an authenticated request to `http://metahub-api.herokuapp.com/eport` as follows -

```
POST http://metahub-api.herokuapp.com/report
```

#### Body

##### `clientId` : The Client ID for your OAuth App

##### `againstId` : The MetaHub ID (provided during OAuth) of the user being reported

##### `reason` : The reason for which the user is being reported

### NOTE - This is an authenticated request and thus requires the `Authorization` Header

### Get Infractions of a user

#### Send an authenticated request to `http://metahub-api.herokuapp.com/report` as follows -

```
http://metahub-api.herokuapp.com/report
```

### NOTE - This is an authenticated request and thus requires the `Authorization` Header
