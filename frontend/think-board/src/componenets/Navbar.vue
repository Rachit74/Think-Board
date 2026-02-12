<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container">
      <!-- Brand -->
      <RouterLink class="navbar-brand" to="/">
        ThinkBoard
      </RouterLink>

      <!-- Toggle (mobile) -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink
              to="/"
              class="nav-link"
              active-class="active"
              exact
            >
              Home
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              to="/create"
              class="nav-link"
              active-class="active"
            >
              Create
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
