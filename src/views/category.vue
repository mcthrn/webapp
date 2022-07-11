<template>
  <div>
    <!-- START -->

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
    <!-- TABLE -->
    <div class="col-md-12">
      <b-table
        id="category-table"
        :fields="category_fields"
        :items="category_data"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :filter="filter"
        :filter-included-fields="filterOn"
        hover
        @filtered="onFiltered"
      >
        <!-- template - to modify yung data ng column -->
        <template #cell(view_details)="data">
          <b-button :to="'/categoryDetails/' + data.item.c_id">
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
    <!--  ADD CATEGORY
    <h1>Add Category</h1>
    <div class="group-container">
      <div class="group-input">
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
        <button class="addbtn" type="button" @click="addCategory()">
          Add Category
        </button>
      </div>
    </div>
    END DIV OF ADD-->
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
      filter: null,
      filterOn: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filterByFormatted: true,
      category_fields: [
        // {
        //   key: "c_id",
        //   label: "ID",
        //   sortable: true,
        //   filterByFormatted: true,
        // },
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
          filterByFormatted: true,
        },
        {
          key: "view_details",
          label: "View Details",
        },

        // { key: 'name', label: 'Person full name', sortable: true, sortDirection: 'desc' },
      ],
      // TABLE VARIABLES END
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.category_fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  async mounted() {
    // Set the initial number of items
    await this.getCategory();
    this.totalRows = this.category_data.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      console.log(filteredItems);
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async getCategory() {
      await axios
        .get("http://localhost:3000/category")
        .then(async (response) => {
          console.log(response.data);
          response.data.forEach((e) => {
            // for date convertion
            this.category_data.push({
              c_id: e.c_id,
              c_name: e.c_name,
              c_createdby: e.c_createdby,
              c_createddate: this.formatDates(e.c_createddate),
            });
          });
          // this.category_data = response.data;
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
  created() {},
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin-left: 100px;
}

/* basic stylings ------------------------------------------ */
body {
  background: url(https://scotch.io/wp-content/uploads/2014/07/61.jpg);
}
.group-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}
.group-input {
  font-family: "Roboto";
  background: #fff;
  padding: 10px 50px 50px;
}
/* form starting stylings ------------------------------- */
.group {
  position: relative;
  margin: 30px;
  display: block;
}
.g-input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
}
.g-input:focus {
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
  color: #2c91fd !important;
  border: 1px solid rgb(212, 212, 212);
  position: relative;
  margin: auto;
  width: 120px;
  background: white;
}
.btn-secondary:hover {
  color: rgb(29, 29, 29) !important;
  border: 1px solid #2c91fd;
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
