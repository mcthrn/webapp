<template>
  <div class="cat_details">
    <div class="bcrumbs">
      <a href="/category">Category </a> &nbsp;
      <p>/ Category Details</p>
    </div>
    <h2>Category Details</h2>
    <div>
      <div class="group">
        <p class="title">Category ID:</p>
        <p class="dataa">{{ cat_id }}</p>
      </div>
    </div>

    <div>
      <div class="group">
        <p class="title">Category Name:</p>
        <p class="dataa">{{ cat_name }}</p>
      </div>
    </div>
    <div>
      <div class="group">
        <p class="title">Created By:</p>
        <p class="dataa">{{ cat_created_by }}</p>
      </div>
    </div>
    <div>
      <div class="group">
        <p class="title">Created Date:</p>
        <p class="dataa">{{ cat_created_date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Roboto";
  margin-left: 250px;
}

.group {
  display: inline-flex;
  text-align: left;
  margin: 0;
  width: 250px;
  border-bottom: 1px solid rgb(235, 235, 235);
}

.dataa {
  text-align: left;
  margin: 0;
  padding: 15px 5px 15px 0;
}
.title {
  text-align: left;
  margin: 0;
  width: 150px;
  padding: 15px 5px 15px 0;
  color: #2c91fd;
}

.cat_details {
  text-align: left;
  margin: 0px 0px 50px 20px;
}
.cat_details h2 {
  text-transform: uppercase;
  margin-bottom: 50px;
}
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
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      category_data: [],
      cat_id: "",
      cat_name: "",
      cat_created_by: "",
      cat_created_date: "",
      createdby: [],
      items: [
        {
          text: "Category",
          href: "/category",
        },
        {
          text: "Category Details",
          active: true,
        },
      ],
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/category/" + this.$route.params.c_id)
      .then((response) => {
        console.warn(this.$route.params.c_id);
        // this.category_data = response.data;
        this.cat_id = response.data[0].c_id;
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
