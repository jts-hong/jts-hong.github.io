---
title: "Hugo Tutorial"
description: ""
date: 2024-12-24T17:06:45-05:00
lastmod: 2024-12-24T17:06:45-05:00
categories:
tags:
draft: false
cover:
    image: "hugo_tutorial.jpg"
    alt: "hugo_tutorial"
    hidden: false
    hiddenInList: false
    hiddenInSingle: false
---

Hugo is a powerful and fast static site generator written in Go. It's perfect for blogs, portfolios, company websites, and much more.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Hugo](https://gohugo.io/)

## Step 1: Installing Hugo

To install Hugo on your system, use the following commands based on your operating system:

### macOS

```bash
brew install hugo
```

### Windows (with Chocolatey)

```bash
choco install hugo -confirm
```

### Linux (with snap)

```bash
sudo snap install hugo
```

## Step 2: Creating a New Site

Once Hugo is installed, you can create a new site using the following command:

```bash
hugo new site mysite
```

Replace "mysite" with the name of your website.

This will create a new directory with the basic structure of a Hugo site.

## Step 3: Adding Content

To add new content to your site, use the `new` command. For example, to create a new post:

```bash
cd mysite
hugo new posts/my-first-post.md
```

This will create a new Markdown file under the `posts` directory. You can open this file and start writing your first post.

## Step 4: Applying a Theme

Hugo uses themes to determine the look and feel of your site. There are many themes available on the [Hugo Themes](https://themes.gohugo.io/) website.

To add a theme, you need to clone it into the `themes` directory of your Hugo site. For example, to install the Ananke theme:

```bash
git clone https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
```

Then, add the theme to your site's configuration file (the new updated Hugo changed the file name to hugo.toml):

```bash
echo 'theme = "ananke"' >> hugo.toml
```

## Step 5: Building and Running Your Site

Once you've added content and chosen a theme, you can build your site and run it locally using the following command:

```bash
hugo server -D
```

You can then open your web browser and go to `http://localhost:1313` to see your site.

Congratulations! You have now created your first Hugo website. Enjoy exploring Hugo's many features and creating more complex and interesting sites.

## Step 6: Publish Your Website

I use github.io for my own website and connect it to my own domain. What you will need to do is run the command below so Hugo will package what it needs to a new folder called public and you can just base your repo root folder to be in that folder.

```bash
hugo -F --cleanDestinationDir
```
