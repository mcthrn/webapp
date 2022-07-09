<template>
  <div>
    <h1>Add Product</h1>
    <div class="form">
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
    </div>
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
      <b-input-group size="sm">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        ></b-form-input>
      </b-input-group>
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
        sku: "",
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
          key: "p_SKU",
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
