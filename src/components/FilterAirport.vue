<template>
  <div id="filter">
    <div class="container">
      <div>
        <div class=" flex-1-2 flex-row flex-nav">
          <div class="main-heading grid-center">
            <span>Filter</span>
            <span>airports</span>
          </div>
          <div class="text-right grid-center">
            <font-awesome-icon icon="th-large" class="font-awesome-large" />
          </div>
        </div>
        <br><br>
        <div class="flex flex-1-2 flex-row">
          <div>
            <span class="sub-heading block">
              Type
            </span>
            <div class="checkbox-group">
              <label>
                Small
                <input type="checkbox" v-model="type" value="small" @change="handleChange()">
                <span class="checkmark"></span>
              </label>
              <label>Medium
                <input type="checkbox" v-model="type" value="medium" @change="handleChange()">
                <span class="checkmark"></span>
              </label>
              <label>Large
                <input type="checkbox" v-model="type" value="large" @change="handleChange()">
                <span class="checkmark"></span>
              </label>
              <label>Heliport
                <input type="checkbox" v-model="type" value="heliport" @change="handleChange()">
                <span class="checkmark"></span>
              </label>
              <label>Closed
                <input type="checkbox" v-model="type" value="closed" @change="handleChange()">
                <span class="checkmark"></span>
              </label>
              <label>In your favorites
                <input type="checkbox">
                <span class="checkmark"></span>
              </label>
            </div>
            <br><br>
            <span class="sub-heading ">
              Data in each pages
            </span>
            <input type="number" min="1" class="number-input" v-model="pageSize">
          </div>
          <div class="responsive-block">
            <span class="sub-heading block">
              Filter by search
            </span>
            <input type="text" v-model="search" class="search-box" placeholder="Search here" />
          </div>

        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ICAO</th>
                <th>IATA</th>
                <th>Elev.</th>
                <th>Lat.</th>
                <th>Long.</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="data in pageList">
                <template>
                  <tr :key="data.id">
                    <td>{{ data.name }}</td>
                    <td>{{ data.icao }}</td>
                    <td>{{ data.iata }}</td>
                    <td>{{ data.elevation }} ft</td>
                    <td>{{ data.latitude }}</td>
                    <td>{{ data.longitude }}</td>
                    <td>{{ data.type }}</td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
        <div class="flex-nav flex-1-3 flex-row page-navigation" v-if="totalPages()>0">
          <div>
            <a v-if="showPrev()" @click="updatePage(currentPage - 1)">
              <font-awesome-icon icon="arrow-left" class="font-awesome-large" />
            </a>
          </div>
          <div class="text-center grid-center">
            <span>
              Showing <b>{{ currentPage + 1 }}-{{totalPages()}}</b> of <b>{{ newdata.length }}</b> results
            </span>
          </div>
          <div class="text-right">
            <a v-if="showNext()" @click="updatePage(currentPage + 1)">
              <font-awesome-icon icon="arrow-right" class="font-awesome-large" />
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import MY_JSON from '../assets/data/airports.json';

  export default {
    name: "filter",
    components: {},
    data() {
      return {
        type: [],
        search: String,
        currentPage: 0,
        pageSize: 4,
        pageList: [],
        newdata: [],
      }
    },
    
    watch: {
      //realtime search input
      search() {
        this.handleChange();
      },
      //calling realtime data per page from pageSize v-model 
      pageSize() {
        this.updatePage(0);
      }

    },

    computed: {
      //retrive data from json file
      data_list() {
        return MY_JSON.map((item) => {
          return item;
        })
      }
    },

    beforeMount: function () {
      this.newdata = this.data_list; //pass data to new array
      this.search = '';
      this.showPage();
    },

    methods: {

      handleChange() {
        this.newdata = [];
        this.data_list.forEach(element => {
          if (this.type.length > 0) {
            this.type.forEach(type_data => { // looping multiple 'type' checkbox array
              //check the characters from search box including the 'type' checked
              if (element.type.includes(type_data) && (
                  element.name.toLowerCase().includes(this.search.toLowerCase()) ||
                  element.iata != null &&
                  element.iata.toLowerCase().includes(this.search.toLowerCase()) ||
                  element.icao.toLowerCase().includes(this.search.toLowerCase())) ||
                element.latitude.toString().includes(this.search ||
                  element.longitude.toString().includes(this.search))) {
                this.newdata.push(element); //if condition valid will push to the new data
              }
            })
          } else { //check only the characters typed from the checkbox
            if (element.name.toLowerCase().includes(this.search.toLowerCase()) ||
              element.iata != null &&
              element.iata.toLowerCase().includes(this.search.toLowerCase()) ||
              element.icao.toLowerCase().includes(this.search.toLowerCase()) ||
              element.latitude.toString().includes(this.search ||
                element.longitude.toString().includes(this.search))) {
              this.newdata.push(element);
            }
          }
        });
        this.updatePage(0);//update the page to 1(parameter pageNumber is 0 so will get updated to +1)

      },

      //calculate the total number of pages based on the number of datas in single page
      totalPages() { 
        return Math.ceil(this.newdata.length / this.pageSize);
      },

      showPrev() {
        return this.currentPage == 0 ? false : true;
      },

      showNext() {
        return this.currentPage == (this.totalPages() - 1) ? false : true;
      },

      updatePage(pageNumber) {
        this.currentPage = pageNumber;
        this.showPage();
      },
      
      //displays how much data to be shown in each page
      showPage() {
        this.pageList = this.newdata.slice(this.currentPage * this.pageSize, (this.currentPage * this
          .pageSize) + this.pageSize);

        //0 page list, go back page
        if (this.pageList.length == 0 && this.currentPage > 0) {
          this.updatePage(this.currentPage - 1);
        }
      }
    }
  };
</script>

<style lang="scss">

</style>