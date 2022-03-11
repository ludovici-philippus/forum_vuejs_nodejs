<template>
  <div>
    <nav class="desktop">
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/minha-conta">Minha Conta</NuxtLink>
        </li>
      </ul>
    </nav>
    <button @click.prevent="open_menu()">⏸️</button>
    <nav class="mobile">
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/minha-conta">Minha Conta</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data() {
    return {
      showing_menu: false,
    }
  },
  methods: {
    open_menu: function () {
      const mobile_menu = document.querySelector(".mobile");
      if (!this.showing_menu) {
        mobile_menu.animate([
          { left: '-250px' },
          { left: '0' }
        ], {
          duration: 700
        })
        mobile_menu.style.left = 0;
        this.showing_menu = true;
      } else {
        mobile_menu.animate([
          { left: '0' },
          { left: '-250px' }
        ], {
          duration: 700
        })
        mobile_menu.style.left = '-250px';
        this.showing_menu = false;
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: var(--cor-3);
  transition: 0.5s;
  font-size: 18px;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
  color: #f8ba57;
}

.desktop li {
  display: inline-block;
  margin-right: 5px;
  margin-top: 7px;
}

button {
  display: none;
  background: transparent;
  border: 0;
  font-size: 24px;
  cursor: pointer;
}

.mobile {
  display: none;
  position: absolute;
  top: 0;
  left: -250px;
  background-color: white;
  min-height: 100%;
  width: 250px;
  padding: 10px;
  text-align: center;
}

.mobile li {
  display: block;
  padding: 10px;
  font-size: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid #333;
}

.mobile li a {
  color: black;
}

@media screen and (max-width: 768px) {
  .mobile {
    display: block;
  }
  .desktop {
    display: none;
  }
  button {
    display: block;
  }
}
</style>
