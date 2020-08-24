<template>
  <div>
    <router-link to="/home">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/products">Products</router-link>|
    <router-link to="/cart">Cart</router-link>|
    <router-link to="/login">Admin</router-link>
    <hr />
    <router-view class="container" />
  </div>
</template>
