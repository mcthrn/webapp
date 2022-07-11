<template>
  <div class="product_details">
    <div class="bcrumbs">
      <a href="/product">Product </a> &nbsp;
      <p>/ Product Details</p>
    </div>
    <!-- MODAL START -->
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
    </b-modal>
    <!-- MODAL END -->

    <div class="group-content">
      <h2>PRODUCT DETAILS</h2>
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
              <label class="g-label">Product SKU</label>
            </div>
          </div>

          <div class="group-input">
            <div class="group">
              <input class="g-input" type="text" v-model="desc" required />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="g-label">Product Description</label>
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
              <label class="g-label">Product Category</label>
              <div class="category_modal">
                <b-button v-b-modal.modal-1 class="modaltext"
                  >Add New Category?</b-button
                >
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
          <b-button
            style="margin-left: 20px"
            variant=""
            @click="updateProduct()"
            class="mb-2"
            >Update Product</b-button
          >
          <!-- <button class="addbtn" type="button" @click="updateProduct()">
            Update Product
          </button> -->
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
    };
  },

  methods: {
    //UPDATING TAGS ON PRODUCT
    // async updateTags() {
    //   const result = await axios.post("http://localhost:3000/updateTags", {
    //     p_id: this.$route.params.p_id,
    //     tag_name: this.productTags,
    //   });

    //   console.log(result);
    // },
    //UPDATE PRODUCT
    async updateProduct() {
      // console.log(this.sku);
      const result = await axios.post("http://localhost:3000/updateProduct", {
        p_id: this.$route.params.p_id,
        tag_name: this.productTags,
        name: this.name,
        sku: this.sku,
        desc: this.desc,
        cost: this.cost,
        price: this.price,
        selectedcategory: this.selectedcategory,
      });
      if (result.data == "Product Update") {
        this.makeToast(
          "success",
          "Update Product",
          "Product successfully updated."
        );
      } else {
        this.makeToast("danger", "Update Product", "Product failed to update.");
      }
      console.warn("result", result);
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
      let tempValidation = [];

      this.category_list.forEach((e) => {
        tempValidation.push(e.toUpperCase());
      });
      let ifCategoryExist = tempValidation.includes(
        this.formcategory.name.toUpperCase()
      );

      if (ifCategoryExist) {
        this.makeToast("warning", "Add Category", "Category already exist!");
        return;
      }
      if (this.formcategory.name == "" || this.formcategory.createdby == "") {
        this.makeToast(
          "warning",
          "Add Category",
          "Category name and created by are required!"
        );
        return;
      }

      const result = await axios.post("http://localhost:3000/category", {
        c_name: this.formcategory.name,
        c_createdby: this.formcategory.createdby,
        c_createddate: new Date(),
      });
      if (result.data == "Insertion was successful") {
        this.category_list = [];
        await this.getCategory();

        this.selectedcategory = this.formcategory.name;
        await this.updateProduct();
      }

      // console.warn("result", result);
    },
    formatDates(date) {
      return moment(date).format("MMMM D,  YYYY");
    },
    //TOAST
    makeToast(variant = null, title = null, message = null) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  }, //method end

  //GET PRODUCT DETAILS
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
  font-family: "Roboto";
}

/* basic stylings ------------------------------------------ */
body {
  background: url(https://scotch.io/wp-content/uploads/2014/07/61.jpg);
}
.modaltext,
.modaltext:hover {
  text-decoration: underline;
}
.product_details {
  margin-left: 250px;
}
.product_details h2 {
  margin: 0px 0px 50px 20px;
}
.group-container {
  width: 600px;
  background: #fff;
}
.group-input {
  display: inline-flex;
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
  color: #2c91fd;
}

.select-category:focus ~ .g-label,
.select-category:valid ~ .g-label {
  top: -20px;
  font-size: 14px;
  color: #2c91fd;
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
  border: none;
  text-align: left;
  display: block;
  background-color: transparent !important;
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
.badge-secondary {
  background-color: #2c91fd !important;
}
.btn-secondary {
  color: #2c91fd !important;
  border: 1px solid rgb(212, 212, 212);
  position: relative;
  margin: auto;
  background: white;
}
.btn-secondary:hover {
  color: rgb(29, 29, 29) !important;
  border: 1px solid #2c91fd;
  position: relative;
  margin: auto;
  background: white;
}
/* BREADCRUMBS */
.bcrumbs {
  display: inline-flex;
  width: fit-content;
  padding: 0;
  margin: 0;
  margin-bottom: 50px;
}
.bcrumbs p {
  margin: 0;
  padding: 0;
  color: #2c91fd;
}
.bcrumbs a {
  color: black;
}
.bcrumbs a:hover {
  color: #2c91fd;
}
</style>
