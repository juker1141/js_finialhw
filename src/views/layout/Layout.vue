<template>
  <div class="container">
    <navbar class="d-flex justify-content-between align-items-center my-3">
      <button class="btn" type="button">
        <span class="material-icons">
        menu
        </span>
      </button>
      <router-link class="fontOrbitron fz_30 text-black text-decoration-none" to="/home">
      Hardware Store</router-link>
      <div>
        <router-link to="/products">Products</router-link>
        <router-link to="/cart">Cart</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/login">Admin</router-link>
      </div>
    </navbar>
    <hr />
    <router-view class="container" />
  </div>
</template>
