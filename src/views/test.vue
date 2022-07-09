<template>
  <div>
    <div class="container">
      <form>
        <div class="group-input">
          <div class="group">
            <input type="text" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Product Name</label>
          </div>

          <div class="group">
            <input type="text" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>SKU</label>
          </div>
        </div>

        <div class="group-input">
          <div class="group">
            <input type="text" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Description</label>
          </div>
          <div class="group">
            <b-form-select
              class="select-category"
              :options="category_data"
              required
            ></b-form-select>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Category</label>
            <p>Add new Category?</p>
          </div>
        </div>

        <div class="group-input">
          <div class="group">
            <input type="text" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Product Cost</label>
          </div>

          <div class="group">
            <input type="text" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Product Price</label>
          </div>
        </div>
        <div style="width: 100%">
          <label for="tags-basic">Type a new tag and press enter</label>
          <b-form-tags input-id="tags-basic" v-model="value"></b-form-tags>
          <p class="mt-2">Value: {{ value }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      category_data: ["test", "test", "test2", "test", "test", "test2"],
      cat_name: "",
      cat_created_by: "",
      cat_created_date: "",
      value: [],
      createdby: [],
    };
  },
  async mounted() {},
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* basic stylings ------------------------------------------ */
body {
  background: url(https://scotch.io/wp-content/uploads/2014/07/61.jpg);
}
.group-input {
  display: inline-flex;
}
.container {
  font-family: "Roboto";
  width: 600px;
  margin: 30px auto 0;
  background: #fff;
  padding: 10px 50px 50px;
}
h2 {
  text-align: center;
  margin-bottom: 50px;
}
h2 small {
  font-weight: normal;
  color: #888;
  display: block;
}

/* form starting stylings ------------------------------- */
.group {
  position: relative;
  margin: 20px;
  display: block;
}
input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: inline-block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
}
input:focus {
  outline: none;
}

.select-category {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: inline-block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
}
.select-category:focus {
  outline: none;
}

/* LABEL ======================================= */
.label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

.select-category:focus ~ label,
.select-category:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  width: 300px;
}
.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

.select-category:focus ~ .bar:before,
.select-category:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}
/*SELECT DROPDOWN*/

/* active state */
input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

.select-category:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
</style>
