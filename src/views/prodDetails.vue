<template>
  <div>
    <div class="group">
      <h1>Product Details</h1>
      <div class="groupDetails">
        <h5>Product Name</h5>
        <p>Test</p>
      </div>

      <div class="groupDetails">
        <h5>Product Name</h5>
        <p>Test</p>
      </div>

      <div class="groupDetails">
        <h5>Product SKU</h5>
        <p>Test</p>
      </div>

      <div class="groupDetails">
        <h5>Product Description</h5>
        <p>Test</p>
      </div>

      <div class="groupDetails">
        <h5>Product Category</h5>
        <p>Test</p>
      </div>

      <div class="groupDetails">
        <h5>Product Cost</h5>
        <p>Test</p>
      </div>

      <div class="groupDetails">
        <h5>Product Price</h5>
        <p>Test</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin-left: 100px;
}
</style>
<!-- <script>
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
  watch: {
    async productTags(newvalue, oldvalue) {
      if (newvalue != oldvalue) {
        await this.updateTags();
      }
    },
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
    async updateTags() {
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
      } else {
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
</script> -->
