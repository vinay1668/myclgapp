
# MyClgApp

MyClgApp is a Forum specifically designed for my college (My final year project)
Uses MongoDB for storing text and IPFS for images,videos,files and the correspondng Hash will be storing in MongoDB
Uses Socket.io for real time communication.
## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB, IPFS
  
## Demo

![Pr1](https://user-images.githubusercontent.com/68241977/167200467-fe7c8fe6-7310-4a08-bed6-314b33fd656e.png)



## Run Locally

Clone the project

```bash
  git clone https://github.com/vinay1668/myclgapp/
```

Go to the project directory

```bash
  cd myclgapp
```

Install dependencies

```bash
  npm install
```

```bash
  cd frontend/
  npm install
```

Start the application (both client and server)

```bash
  npm run dev
```
# Features

### Registration

Users have to initially register using the official college Email Id by clicking on the register with google button.
<br />


![pr2](https://user-images.githubusercontent.com/68241977/167201208-1411fb51-49fa-4507-8e42-9108943f9496.png)
<br />

After Successful verfication, you will be redirected to the Registration Page.
By default, the Username will be the registration number taken from you official Email Id. But the name can be changed if you want. After filling all the fields, 
click on the Submit button to create and account.

<br />

![pr3](https://user-images.githubusercontent.com/68241977/167202031-a3426b15-9dd4-4f75-8c3e-1173131ec785.png)

<br />

After successful registration, you will be redirected to the Homepage of the application.

![Pr1](https://user-images.githubusercontent.com/68241977/167203008-9c5fb70a-ffb5-4d95-bfca-2ae78caa1996.png)

On the left side, you can see your profile which consists of your username, name, branch and description about you which can be editer.
Along with you profile there exists your total posts and the aggregate votes of all your posts. On right side, there is a chat pane which is used for either one to one
or group interaction. The middle section consists of Editor for post, filters, and the actual posts.


### Post Editor

![pr4](https://user-images.githubusercontent.com/68241977/167206915-d42a6a45-7c10-414b-9049-8e1dba613851.png)

The Top Search bar can be used to search other users and if clicked on any specific user, you will get redirected to that user's profile. The recommendations will be
populated as soon as you start entering something in search box (shown in the below picture). You can either search by username or name.

![pr6](https://user-images.githubusercontent.com/68241977/167207530-ffd54aa8-b21d-42fe-9c5c-46e92e07716a.png)

On the left side of the Top bar, you can see your profile and the logout button. By clicking on the logout button, you will be logged out of this web application.When
you click on you profile icon you will be redirected to your profile page where all your posts can be viewed at the same page.




































