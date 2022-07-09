<template>
  <div>
    <h2>Product Details</h2>
    <label for="">Product Name:</label>
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
      <!-- ADD CATEGORY -->
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
  </div>
</template>

<style></style>
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
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
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
    async addCategory() {
      let catListValidation = [];
      this.category_data.forEach((e) => {
        catListValidation.push(e.c_name);
      });

      let ifCategoryExist = catListValidation.includes(this.formcategory.name);
      if (ifCategoryExist) {
        alert(this.formcategory.name + " already exist!");
        return;
      }

      console.log(this.formcategory);
      const result = await axios.post("http://localhost:3000/category", {
        c_name: this.formcategory.name,
        c_createdby: this.formcategory.createdby,
        c_createddate: new Date(),
      });
      if (result.data == "Insertion was successful") {
        this.category_data = [];
        await this.getCategory();
      }
      console.warn("result", result);
    },
    formatDates(date) {
      return moment(date).format("MMMM D,  YYYY");
    },
  },
  created() {
    this.getCategory();
  },
};
</script>
