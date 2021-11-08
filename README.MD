
# JobEase - Explore & Manage Jobs 💼

An API to explore and manage jobs with ease.
Update your recruitment process status on the go and stay ahead in the game.


## Run Locally

Clone the project

```bash
  git clone https://github.com/SyedAli310/jobs-api-node-js.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` - Your mongoDB connection string 

`JWT_SECRET` - Your secret string for JWT auth

`JWT_LIFETIME` - JWT expiration duration


## Deployed Links

#### API       - `https://jobease.herokuapp.com`      [🔗](https://jobease.herokuapp.com)
#### Front-end - `https://jobease.netlify.app`        [🔗](https://jobease.netlify.app)


## Security

- `helmet`
- `cors`
- `xss-clean`
- `express-rate-limit`

## API Reference/Endpoints

#### Register a new user

```https
  POST /api/v1/auth/register
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | <**Required**> User name |
| `email` | `string` | <**Required**> User Email |
| `password` | `string` | <**Required**> Password |

---
#### Login a user

```https
  POST /api/v1/auth/login
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | <**Required**> User Email |
| `password` | `string` | <**Required**> User Password |

---

#### Get all jobs for a user

```https
  GET /api/v1/jobs
```

| Header | Value | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `Authorization` | Bearer `{JWT_TOKEN}` | `string` | <**Required**> Logged User JWT_TOKEN |

| Parameter | Type     | Allowed Values | Description                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `status`      | `string` | *`<pending>`  `<interview>` `<declined>`* | <**optional**> Jobs with `<status>` |
| `position`      | `string` | *any query string* | <**optional**> Jobs matching `<position>` |
| `company`      | `string` | *any query string* | <**optional**> Jobs matching `<company>` |
| `sort`      | `string` | *`<createdAt>` `<updatedAt>` `<company>` `<position>`* | <**optional**> Jobs sorted `<Allowd values>`. Multiple comma-seperated values allowed |

---
#### Get single job for a user

```https
  GET /api/v1/jobs/{id}
```
| Header | Value | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `Authorization` | Bearer `{JWT_TOKEN}` | `string` | <**Required**> Logged User JWT_TOKEN |

---
#### Create job for a user

```https
  POST /api/v1/jobs
```

| Header | Value | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `Authorization` | Bearer `{JWT_TOKEN}` | `string` | <**Required**> Logged User JWT_TOKEN |

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `company` | `string` | <**Required**> Company name |
| `position` | `string` | <**Required**> Job position |
| `link` | `string` | <**Required**> Job link/URL |
| `status` | `string` | <**Required**> Job/Application status |



---
#### Update job for a user

```https
  PATCH /api/v1/jobs/{id}
```
| Header | Value | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `Authorization` | Bearer `{JWT_TOKEN}` | `string` | <**Required**> Logged User JWT_TOKEN |

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `company` | `string` | <**optional**> Updated company |
| `position` | `string` | <**optional**> Updated position |
| `link` | `string` | <**optional**> Updated link/URL |
| `status` | `string` | <**optional**> Updated status |

---
#### Delete job for a user

```https
  DELETE /api/v1/jobs/{id}
```
| Header | Value | Type     | Description                |
| :-------- | :------- | :------- | :------------------------- |
| `Authorization` | Bearer `{JWT_TOKEN}` | `string` | <**Required**> Logged User JWT_TOKEN |

---

#### Get all jobs **(explore)** - `open endpoint`

```https
  GET /api/v1/explore/jobs
```
| Parameter | Type     | Allowed Values | Description                       |
| :-------- | :------- | :------- | :-------------------------------- |
| `company`      | `string` | *any query string* | <**optional**> Jobs matching `<company>` |
| `position`      | `string` | *any query string* | <**optional**> Jobs matching `<position>` |
| `limit`      | `number` | *any positive number* | <**optional**> Number of jobs per page `<limit>` |
| `page`      | `number` | *any positive number* | <**optional**> Jobs on page number `<page>` |

## Authors

- [@syedali](https://www.github.com/SyedAli310)

## 🚀 About Me
I'm a full stack developer. I love working in JavaScript and related technologies.

## 🛠 Skills
`Javascript` `jQuery` `HTML`  `CSS` `reactjs` `django` `php` `nodejs` 


## 🔗 Socials - Say Hi 👋
[![email](https://img.shields.io/badge/email-000?style=for-the-badge&logo=ko-fi&logoColor=white)](mailto:alizaidi310@email.com)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/syed-ali-058b7610b/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/alizaidi310)


## Feedback

If you have any feedback, please reach out to me at alizaidi310@gmail.com

