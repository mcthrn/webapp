<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Category</router-link> |
      <router-link to="/product">Product</router-link>
    </nav> -->
    <div class="wrapper">
      <div class="sidebar">
        <h2>WEB APP</h2>
        <ul>
          <li>
            <a href="/category" to="/">Category</a>
          </li>
          <li>
            <a href="/product">Product</a>
          </li>
          <!--  -->
        </ul>
      </div>
      <div class="main_content">
        <div class="header">Welcome!! Have a nice day.</div>
        <div class="info">
          <!-- <div class="table">Category:</div>
          <div class="table">Product</div> -->
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  overflow: hidden;
}

body {
  background-color: #f3f5f9;
}

.wrapper {
  display: flex;
  position: relative;
}

.wrapper .sidebar {
  width: 200px;
  height: 100%;
  background: #ffffff;
  padding: 30px 0px;
  position: fixed;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.wrapper .sidebar h2 {
  color: #000;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 30px;
}

.wrapper .sidebar ul li {
  padding: 15px;
  border-bottom: 1px solid #1281f8;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.wrapper .sidebar ul li a {
  color: black;
  display: block;
}

.wrapper .sidebar ul li a .fas {
  width: 25px;
}

.wrapper .sidebar ul li:hover {
  background-color: rgb(243, 243, 243);
}

.wrapper .sidebar ul li:hover a {
  color: #1281f8;
}
.wrapper .sidebar ul li a .active {
  color: #1281f8;
}
.wrapper .sidebar .social_media {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.wrapper .sidebar .social_media a {
  display: block;
  width: 40px;
  background: #594f8d;
  height: 40px;
  line-height: 45px;
  text-align: center;
  margin: 0 5px;
  color: #bdb8d7;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.wrapper .main_content {
  width: 100%;
  margin-left: 200px;
}

.wrapper .main_content .header {
  padding: 20px;
  background: #fff;
  color: #717171;
  border-bottom: 1px solid #e0e4e8;
}

.wrapper .main_content .info {
  margin: 20px;
  color: #717171;
  line-height: 25px;
  display: inline-flex;
}

.wrapper .main_content .info div {
  margin-bottom: 20px;
}
.table {
  margin: 20px;
  border: 1px solid;
  width: 250px;
}
@media (max-height: 500px) {
  .social_media {
    display: none !important;
  }
}
</style>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->
