<template>
  <div class="cat_details">
    <h2>Category Details</h2>
    <p>Category Name: {{ cat_name }}</p>
    <p>Created By: {{ cat_created_by }}</p>
    <p>Created Date: {{ cat_created_date }}</p>
    Product:
    <select name="" id="">
      <option value="">Products</option>
    </select>
  </div>
</template>

<style>
.cat_details {
  width: 500px;
  padding: 50px;
  justify-content: center;
  align-content: center;
  display: block;
  margin: 0 auto;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.cat_details h2 {
  margin-bottom: 30px;
}
</style>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      category_data: [],
      cat_name: "",
      cat_created_by: "",
      cat_created_date: "",
      createdby: [],
    };
  },

  name: "",
  sku: "",
  desc: "",
  cost: "",
  price: "",
  tags: "",
  async mounted() {
    await axios
      .get("http://localhost:3000/category/" + this.$route.params.c_id)
      .then((response) => {
        console.warn(this.$route.params.c_id);
        // this.category_data = response.data;
        this.cat_name = response.data[0].c_name;
        this.cat_created_by = response.data[0].c_createdby;
        this.cat_created_date = moment(response.data[0].c_createddate).format(
          "MMMM D,  YYYY"
        );

        this.console.log(this.category_data);
      })
      .catch((response) => {});
  },
};
</script>
