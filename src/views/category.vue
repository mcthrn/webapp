<template>
  <div>
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
    <!--END DIV OF ADD-->
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
      category_fields: [
        {
          key: "c_id",
          label: "ID",
          sortable: true,
          filterByFormatted: true,
        },
        {
          key: "c_name",
          label: "Category Name",
          sortable: true,
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
          sortable: true,
          filterByFormatted: true,
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
<style scoped>
* {
  box-sizing: border-box;
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
