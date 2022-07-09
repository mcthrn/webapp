<template>
  <div>
    <b-modal
      id="modal-1"
      title="BootstrapVue"
      @ok="addCategory()"
      ok-title="Add Category"
    >
      <div class="group">
        <input
          class="g-input"
          type="text"
          v-model="formcategory.name"
          required
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label class="g-label">Category Name</label>
      </div>

      <div class="group">
        <input
          class="g-input"
          type="text"
          v-model="formcategory.createdby"
          required
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label class="g-label">Created By</label>
      </div>
      <!-- <button class="addbtn" type="button" @click="addCategory()">
        Add Category
      </button> -->
    </b-modal>

    <h2>Product Details</h2>
    <div class="col-md-12">
      <div class="group-container">
        <form>
          <div class="group-input">
            <div class="group">
              <input class="g-input" type="text" v-model="name" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="g-label">Product Name</label>
            </div>

            <div class="group">
              <input class="g-input" type="text" v-model="sku" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="g-label">SKU</label>
            </div>
          </div>

          <div class="group-input">
            <div class="group">
              <input class="g-input" type="text" v-model="desc" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="g-label">Description</label>
            </div>
            <div class="group">
              <b-form-select
                class="select-category"
                v-model="selectedcategory"
                :options="category_list"
                required
              ></b-form-select>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="g-label">Category</label>
              <div class="category_modal">
                <b-button v-b-modal.modal-1>Add New Category?</b-button>
              </div>
            </div>
          </div>

          <div class="group-input">
            <div class="group">
              <input class="g-input" type="text" v-model="cost" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="g-label">Product Cost</label>
            </div>

            <div class="group">
              <input class="g-input" type="text" v-model="price" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="g-label">Product Price</label>
            </div>
          </div>
          <div class="group">
            <label for="tags-basic">Product Tags</label>
            <b-form-tags
              input-id="tags-basic"
              v-model="productTags"
            ></b-form-tags>
          </div>

          <button class="addbtn" type="button" @click="updateTags()">
            Update Product
          </button>
          <!-- <div style="width: 100%">
          <label for="tags-basic">Type a new tag and press enter</label>
          <b-form-tags input-id="tags-basic" {{proddetails.tags}}></b-form-tags>
          <p class="mt-2">Value: {{ proddetails.tags }}</p>
        </div> -->
        </form>
      </div>
    </div>
    <!-- <label for="">Product Name:</label>
    <input id="" placeholder="Product Name" required />
    <br />
    <label for="">SKU: </label>
    <input id="" placeholder="SKU" required />
    <br />
    <label for="">Description:</label>
    <input id="" placeholder="Description" required />
    <br />
    <label for="">Category: </label>
    <b-form-select id="" :options="category_list" required></b-form-select>

    <div>
      <button
        class="btn-modal"
        id="show-btn"
        @click="$bvModal.show('bv-modal-example')"
      >
        Add new category?
      </button>
      ADD CATEGORY 
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title> </template>
        <div class="d-block text-center">
          <input
            type="text"
            value=""
            placeholder="Category Name"
            v-model="formcategory.name"
          />
          <br />
          <input
            type="text"
            value=""
            placeholder="Created By"
            v-model="formcategory.createdby"
          />
          <br />
          <button type="button" @click="addCategory()">Add Category</button>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
          >Close Me</b-button
        >
      </b-modal>
    </div>
    <label for="">Cost:</label>
    <input id="" placeholder="Cost" required />
    <br />
    <label for="">Price:</label>
    <input id="" placeholder="Price" required />
    <br />
    <label for="">Tags:</label>
    <input id="" placeholder="Tags" required />
  </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      category_list: [],
      formcategory: {
        name: "",
        createdby: "",
      },
      productTags: [],
      selectedcategory: "",
      name: "",
      sku: "",
      desc: "",
      cost: "",
      price: "",
      tags: "",
    };
  },

  methods: {
    //UPDATING TAGS ON PRODUCT
    async updateTags() {
      const result = await axios.post("http://localhost:3000/updateTags", {
        p_id: this.$route.params.p_id,
        tag_name: this.productTags,
      });

      console.log(result);
    },

    //GETTING CATEGORY OF THE PRODUCT
    async getCategory() {
      await axios
        .get("http://localhost:3000/category")
        .then(async (response) => {
          response.data.forEach((e) => {
            this.category_list.push(e.c_name);
          });
        })
        .catch(async (response) => {});
    },
    //ADDING NEW CATEGORY FOR THE PRODUCT
    async addCategory() {
      let catListValidation = [];
      this.category_list.forEach((e) => {
        catListValidation.push(e.c_name);
      });

      let ifCategoryExist = catListValidation.includes(this.formcategory.name);
      if (ifCategoryExist) {
        alert(this.formcategory.name + " already exist!");
        return;
      }

      if (this.formcategory.name == "" || this.formcategory.createdby == "") {
        alert("Category name and created by are required!");
        return;
      }
      console.log(this.formcategory);
      const result = await axios.post("http://localhost:3000/category", {
        c_name: this.formcategory.name,
        c_createdby: this.formcategory.createdby,
        c_createddate: new Date(),
      });
      if (result.data == "Insertion was successful") {
        this.category_list = [];
        await this.getCategory();

        this.selectedcategory = this.formcategory.name;
      }

      // console.warn("result", result);
    },
    formatDates(date) {
      return moment(date).format("MMMM D,  YYYY");
    },
    async updateProduct() {
      console.log(this.formproduct);
      const result = await axios.post("http://localhost:3000/product", {
        p_sku: this.formproduct.sku,
        p_name: this.formproduct.name,
        p_description: this.formproduct.description,
        p_category: this.formproduct.category,
        p_cost: this.formproduct.cost,
        p_price: this.formproduct.price,
        p_tags: this.formproduct.tags,
      });
      if (result.data == "Insertion was successful") {
        alert("success");
        this.getProduct();
      }
      console.warn("result", result);
    },
  }, //method end

  //GET PRODUCT
  async mounted() {
    await axios
      .get("http://localhost:3000/product/" + this.$route.params.p_id)
      .then((response) => {
        // alert("test");
        // console.warn(this.$route.params.p_id);
        this.proddetails = response.data;
        this.name = response.data[0].p_name;
        this.selectedcategory = response.data[0].p_category;
        this.sku = response.data[0].p_sku;
        this.desc = response.data[0].p_description;
        this.cost = response.data[0].p_cost;
        this.price = response.data[0].p_price;
        this.tags = response.data[0].p_tags;

        // split for converting string to array basta me comma (,)
        this.productTags = response.data[0].p_tags.split(",");
        console.log(this.proddetails);
      })
      .catch((response) => {});
  },
  created() {
    this.getCategory();
  },
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
.group-container {
  font-family: "Roboto";
  width: 600px;
  margin: 30px auto 0;
  background: #fff;
  padding: 10px 50px 50px;
}
/* form starting stylings ------------------------------- */
.group {
  position: relative;
  margin: 20px;
  display: block;
}
.g-input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: inline-block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
}
.g-input:focus {
  outline: none;
}

.select-category {
  font-size: 18px;
  padding: 0px 10px 10px 0px;
  margin: 8px 10px 0px 0px;
  display: inline-block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
  color: black;
}
.select-category:focus {
  outline: none;
}
/* LABEL ======================================= */
.g-label {
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
.g-input:focus ~ .g-label,
.g-input:valid ~ .g-label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

.select-category:focus ~ .g-label,
.select-category:valid ~ .g-label {
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
.g-input:focus ~ .bar:before,
.g-input:focus ~ .bar:after {
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
.g-input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

.select-category:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}
.category_modal .btn {
  padding: 5px 0 0 0;
  color: black;
  background: transparent;
  border: none;
  text-align: left;
  display: block;
}
.addbtn {
  background: transparent;
  height: 40px;
  padding: 0 10px 0 10px;
  border: 1px solid #5264ae;
  color: #5264ae;
}
.addbtn:hover {
  background: #5264ae;
  color: white;
  transition: 0.1s ease all;
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
