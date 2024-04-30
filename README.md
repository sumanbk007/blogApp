# Blog App

## Description

Blog App is a simple web application that allows users to create, read, update, and delete (CRUD) blog posts.
Blogging enthusiasts who want to share their thoughts and ideas online can utilize this appication.

## Features

- **Create**: Users can add new blog posts.
- **Read**: Users can view all the blog posts.
- **Update**: Users can modify their existing blog posts.
- **Delete**: Users can remove their blog posts.


## Technology Stack

- **Frontend**: React, Redux Toolkit
- **Backend**: Node.js, Express, MongoDB
- **Styling**: CSS


  
## Installation

Clone the repository to your local machine:
```bash
git clone https://github.com/sumanbk007/blogApp.git
cd blogApp
```
# API Endpoints

Below are the API endpoints available in this application:

## Authentication

- **Sign Up**
  - `POST /signup` - Sign up a new user.
- **Login**
  - `POST /login` - Login an existing user.

## Blogs

- **Get Blogs**
  - `GET /blogs` - Retrieve the list of all blogs.
- **Add Blog** 
  - `POST /blogs` - Add a new blog.
- **Update Blog** 
  - `PUT /blogs/:id` - Update a blog by ID.
- **Delete Blog** 
  - `DELETE /blogs/:id` - Delete a blog by ID.


