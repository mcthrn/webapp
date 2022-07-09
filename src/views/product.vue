<template>
  <div>
    <!-- <div class="form">
      <input type="text" placeholder="SKU" v-model="formproduct.sku" />
      <input type="text" placeholder="Name" v-model="formproduct.name" />
      <input
        type="text"
        placeholder="description"
        v-model="formproduct.description"
      />
      <label for="">Category:</label>

      <b-form-select
        id=""
        :options="category_list"
        v-model="formproduct.category"
        required
      ></b-form-select>

      <input type="text" placeholder="cost" v-model="formproduct.cost" />
      <input type="text" placeholder="price" v-model="formproduct.price" />
      <input type="text" placeholder="tags" v-model="formproduct.tags" />
      <button type="button" @click="addProduct()">Add Category</button>
    </div> -->
    <!-- <table border="1">
      <tr>
        <td>ID</td>
        <td>SKU</td>
        <td>Name</td>
        <td>description</td>
        <td>category</td>
        <td>cost</td>
        <td>price</td>

        <td>Actions</td>
      </tr>
      <tr v-for="prod in product" :key="prod.p_id">
        <td>{{ prod.p_id }}</td>
        <td>{{ prod.p_SKU }}</td>
        <td>{{ prod.p_name }}</td>
        <td>{{ prod.p_description }}</td>
        <td>{{ prod.p_category }}</td>
        <td>{{ prod.p_cost }}</td>
        <td>{{ prod.p_price }}</td>
        <td>{{ prod.p_tags }}</td>
        <td>
          <router-link :to="'productDetails/' + prod.p_id">View</router-link>
        </td>
      </tr>
    </table> -->

    <!-- // -->
    <!-- FILTER START -->
    <b-col lg="6" class="my-1">
      <b-form-group
        label="Filter"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-col>
    <!-- FILTER END -->
    <b-table
      id="product-table"
      :fields="product_fields"
      :items="product_data"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear=""
      :filter="filter"
      :filter-included-fields="filterOn"
      hover
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
    >
      <!-- template - to modify yung data ng column -->

      <template #cell(view_details)="data">
        <b-button :to="'/productDetails/' + data.item.p_id">
          View Details</b-button
        >
      </template>
    </b-table>
    <!-- ADD -->
    <h1>Add Product</h1>
    <div class="group-container">
      <form>
        <div class="group-input">
          <div class="group">
            <input
              class="g-input"
              type="text"
              v-model="formproduct.name"
              required
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="g-label">Product Name</label>
          </div>

          <div class="group">
            <input
              class="g-input"
              type="text"
              v-model="formproduct.sku"
              required
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="g-label">SKU</label>
          </div>
        </div>

        <div class="group-input">
          <div class="group">
            <input
              class="g-input"
              type="text"
              v-model="formproduct.description"
              required
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="g-label">Description</label>
          </div>
          <div class="group">
            <b-form-select
              class="select-category"
              v-model="formproduct.category"
              :options="category_list"
              required
            ></b-form-select>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="g-label">Category</label>
            <!-- <div class="category_modal">
              <b-button v-b-modal.modal-1>Add New Category?</b-button>
              <b-modal id="modal-1" title="BootstrapVue">
                <p class="my-4">Hello from modal!</p>
              </b-modal>
            </div> -->
          </div>
        </div>

        <div class="group-input">
          <div class="group">
            <input
              class="g-input"
              type="number"
              v-model="formproduct.cost"
              required
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="g-label">Product Cost</label>
          </div>

          <div class="group">
            <input
              class="g-input"
              type="number"
              v-model="formproduct.price"
              required
            />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="g-label">Product Price</label>
          </div>
        </div>
        <div class="group">
          <button class="addbtn" type="button" @click="addProduct()">
            Add Product
          </button>
        </div>
        <!-- <div style="width: 100%">
          <label for="tags-basic">Type a new tag and press enter</label>
          <b-form-tags input-id="tags-basic" {{proddetails.tags}}></b-form-tags>
          <p class="mt-2">Value: {{ proddetails.tags }}</p>
        </div> -->
      </form>
    </div>

    <!--END DIV OF ADD-->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show: true,
      formproduct: {
        sku: "",
        name: "",
        description: "",
        category: "",
        cost: "",
        price: "",
        tags: "",
      },
      category_list: [],
      product_data: [],
      filter: null,
      filterOn: [],
      product_fields: [
        {
          key: "p_id",
          label: "ID",
          filterByFormatted: true,
        },
        {
          key: "p_sku",
          label: "SKU",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "p_name",
          label: "Name",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "p_description",
          label: "Description",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "p_category",
          label: "Category",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "p_cost",
          label: "Cost",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "p_price",
          label: "Price",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "p_tags",
          label: "Tags",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "view_details",
          label: "View Details",
          sortable: true,
          filterByFormatted: true,
        },
      ],
    };
  },

  methods: {
    async getCategory() {
      await axios
        .get("http://localhost:3000/category")
        .then(async (response) => {
          response.data.forEach((e) => {
            this.category_list.push({ value: e.c_id, text: e.c_name });
          });
        })
        .catch(async (response) => {});
    },
    async getProduct() {
      await axios
        .get("http://localhost:3000/product")
        .then(async (response) => {
          console.table(response);
          this.product_data = response.data;
        })
        .catch(async (response) => {});
    },
    async addProduct() {
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
  },

  created() {
    this.getProduct();
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
  width: 1000px;
  margin: 30px auto 0;
  background: #fff;
  padding: 10px 50px 50px;
}
/* form starting stylings ------------------------------- */
.group-input {
  display: inline-flex;
}
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
/* BUTTON */

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
