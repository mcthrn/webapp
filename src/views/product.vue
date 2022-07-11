<template>
  <div>
    <!-- FILTER START -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm" class="m-0">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-25"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              style="width: 2vw !important"
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >  <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select> -->

      <br />
      <!-- FILTER -->
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm" style="width: 15vw">
            <b-form-input
              class="m-0"
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <br />
      <!-- PAGINATION -->
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            style="width: 10vw"
            class="selectpage"
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- FILTER END -->

    <div class="col-md-12">
      <b-table
        class="b-table"
        id="product-table"
        responsive="true"
        :fields="product_fields"
        :items="product_data"
        :current-page="currentPage"
        :per-page="perPage"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :filter="filter"
        :filter-included-fields="filterOn"
        hover
      >
        <!-- template - to modify yung data ng column -->
        <template #cell(view_details)="data">
          <b-button :to="'/productDetails/' + data.item.p_id">
            View Details</b-button
          >
        </template>
      </b-table>
    </div>
    <center>
      <b-col>
        <b-pagination
          style="width: 10vw; margin-left: -200px"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
        ></b-pagination>
      </b-col>
    </center>
    <!--ADD
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
          <b-button variant="success" @click="addProduct()" class="mb-2"
            >Success</b-button
          >
        </div>
      </form>
    </div>

    END DIV OF ADD-->
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
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      filterByFormatted: true,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      product_fields: [
        // {
        //   key: "p_id",
        //   label: "ID",
        //   sortable: true,
        //   filterByFormatted: true,
        // },
        // {
        //   key: "p_sku",
        //   label: "SKU",
        //   sortable: true,
        //   filterByFormatted: true,
        // },
        {
          key: "c_name",
          label: "Category",
          sortable: true,
          filterByFormatted: true,
          sortByFormatted: true,
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
        // {
        //   key: "p_tags",
        //   label: "Tags",
        //   sortable: true,
        //   filterByFormatted: true,
        // },
        {
          key: "view_details",
          label: "View Details",
        },
      ],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.product_fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  async mounted() {
    await this.getProduct();
    this.totalRows = this.product_data.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      console.log(filteredItems);
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    // GET CATEGORY
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
        this.makeToast("success", "Add Product", "Product successfully added.");
        this.formproduct.sku = "";
        this.formproduct.name = "";
        this.formproduct.description = "";
        this.formproduct.category = "";
        this.formproduct.cost = "";
        this.formproduct.price = "";
        this.formproduct.tags = "";
        this.getProduct();
      } else {
        this.makeToast("danger", "Add Product", "Product failed to add.");
      }
      console.warn("result", result);
    },
    //TOAST
    makeToast(variant = null, title = null, message = null) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  }, //METHOD END

  created() {
    this.getProduct();
    this.getCategory();
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin-left: 100px;
}
/* modified td */

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
/*b-table* */

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
.btn-secondary {
  color: #007bff !important;
  border: 1px solid rgb(212, 212, 212);
  position: relative;
  margin: auto;
  width: 120px;
  background: white;
}
.btn-secondary:hover {
  color: rgb(29, 29, 29) !important;
  border: 1px solid #007bff;
  position: relative;
  margin: auto;
  width: 120px;
  background: white;
}
.b-table {
  width: 80%;
  margin-top: 50px;
  border: 1px solid rgb(212, 212, 212);
  text-align: left;
}
</style>
