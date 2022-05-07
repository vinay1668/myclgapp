
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

In the Post section, you can post either the text or other media but the title for the post is must. You can post image, video or file by clicking on the corresponding button. If you click on buttons other than Post, this will show up. Then you can upload the required file or image from your machine.

![pr8](https://user-images.githubusercontent.com/68241977/167210342-4ff32b1c-e01a-4b14-a79f-09b64ecbc70b.png)

You can choose to be anonyomous if you want by clicking on the incognito icon. If this icons is selected the post will anonyomous (no name and username will be showed in the post) and if not selected the post will be a normal one. As shown below,

![pr9](https://user-images.githubusercontent.com/68241977/167210849-cae87506-f6cf-439e-8434-53652b800e50.png)

After you completely edited your post, click on the post button to post and discard to destroy the post. One can post multiple images, videos, files or any combinations of these.

### Post 

![pr10](https://user-images.githubusercontent.com/68241977/167211738-90831725-8e0c-4520-9344-12d9e2a1f3b6.png)

The post consists of username and name along with you the profile picture of the person who posted it. Then the title of the post and the actual content.By clicking on the profile icons or username you will be redirected to the profile page of that particular user. One can upvote or downvote the post. The upvote is the uparrow and the downvote is the downarrow. The aggregate count of that post is displayed in the middle. There is a comment icon besides votes and a number that denotes the number of comments for that post.When clicked on the comment icon you will be redirected to the comment page of that post.


### One to One chat

![pr12](https://user-images.githubusercontent.com/68241977/167238786-a5847fba-3e9a-475b-ad6e-ce41cb0d1c60.png)

On the left side of the application, one can see the chat pane where any user can interact with any other user. They can find other people by searching in the search bar. After clicking in the search icon, all the related users will be populated and one can select any user to chat. If you click on the search icon without any keywords in the search box all the users will displayed.

![pr14](https://user-images.githubusercontent.com/68241977/167239190-ff1a8812-8bf2-49d2-b735-68dbed364778.png)

One can chat in this web application just like in any other application. But here, the functionality is limited. For now, there are no notification if you receive a text which is a major drawback.

### Group Chat

![pr17](https://user-images.githubusercontent.com/68241977/167239494-d6cfa641-8f3c-45b8-a62f-099de65fe304.png)


There also exists Group chats where many users can interact at once. But these groups can only be created by the faculty, students can not be able to create these groups. And only the faculty can add or remove any user from the group (this is done to reduce the data storage). If one clicks on the group profile or name which appears at the top, they will be redirected to the profile of that Group as shown in below.

![pr19](https://user-images.githubusercontent.com/68241977/167239627-09e1c018-dbc5-4f6d-88f1-b16a8f34f609.png)

One can see the group name, members and the Admin. If you are the admin you can add users and delete users.















