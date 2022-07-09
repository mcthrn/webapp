<template>
  <div>
    <h1>Add Category</h1>
    <div action="">
      <input
        type="text"
        value=""
        placeholder="Category Name"
        v-model="formcategory.name"
      />
      <input
        type="text"
        value=""
        placeholder="Created By"
        v-model="formcategory.createdby"
      />
      <button type="button" @click="addCategory()">Add Category</button>
    </div>

    <b-col lg="6" class="my-1">
      <!-- FILTER START -->
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

    <!-- TABLE -->
    <b-table
      id="category-table"
      :fields="category_fields"
      :items="category_data"
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
      <template #cell(c_createddate)="data">
        <p>{{ formatDates(data.item.c_createddate) }}</p>
      </template>
      <template #cell(view_details)="data">
        <b-button :to="'/categoryDetails/' + data.item.c_id">
          View Details</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      formcategory: {
        name: "",
        createdby: "",
      },
      // TABLE VARIABLES START
      category_data: [],
      pageSizes: [4, 8, 12],
      perPage: 30,
      currentPage: 1,
      filter: null,
      filterOn: [],
      category_fields: [
        { key: "c_id", label: "ID", sortable: true, filterByFormatted: true },
        {
          key: "c_name",
          label: "Category Name",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "c_createdby",
          label: "Created By",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "c_createddate",
          label: "Created Date",
          sortable: true,
        },
        {
          key: "view_details",
          label: "View Details",
          sortable: true,
        },

        // { key: 'name', label: 'Person full name', sortable: true, sortDirection: 'desc' },
      ],
      // TABLE VARIABLES END
    };
  },
  methods: {
    viewDetails(a) {
      console.log(a);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async getCategory() {
      await axios
        .get("http://localhost:3000/category")
        .then(async (response) => {
          console.table(response);
          this.category_data = response.data;
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
