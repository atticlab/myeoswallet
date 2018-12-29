<template>
  <footer class="footer footer-black footer-white">
    <div class="container-fluid">
      <div class="row">
        <nav class="footer-nav">
          <ul>
            <li>
              <a href="http://atticlab.net/eos" target="_blank">
                ATTIC LAB
              </a>
            </li>
            <li>
              <a href="https://t.me/myeoswallet_support" target="_blank">
                SUPPORT
              </a>
            </li>
          </ul>
        </nav>
        <div class="credits ml-auto">
          <div class="copyright">
            {{ new Date().getFullYear() }}. Attic Lab. &copy; All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'main-footer',
};
</script>
<style>
</style>
