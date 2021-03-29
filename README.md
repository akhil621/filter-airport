# Filter Airport

This filter airport is a basic filter tool where you can view the airports and filter by their
types (small, medium, large, heliport, closed, etc) and by the common search which search
in name, ICAO, IATA, lat, lon, etc. Also data showing in chunk form. So, you can navigate on
different pages by left and right arrow.

This task is made in Vue JS, and for styling SCSS is used.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Adtional Package

"sass-loader": "^8.0.2", <br/>
"@fortawesome/fontawesome-svg-core": "^1.2.35", <br/>
"@fortawesome/free-solid-svg-icons": "^5.15.3",<br/>
"@fortawesome/vue-fontawesome": "^2.0.2"

## Usage
 
 ### Type Filter

 Type filter option when selected displays the realtime data based on airport type. Multiple options can be selected based on that pagination will also get changed. Multiple checkbox selected will stored in array ```type``` variable and will pass in forEach inside the forEach form the json data(```data_list```) and valid condition push to a ```newData``` array.

```
 this.data_list.forEach(element => {
    if (this.type.length > 0) {
        this.type.forEach(type_data => { 
            if (element.type.includes(type_data)){
                this.newdata.push(element);
              }
        })
    }
 })
```

![alt text](/src/assets/documentation/checkbox.PNG "Type")


### Search Filter

Search filter input displays the realtime data based on name, icao, iata, latitude and longitude. This can also work with the combination on type filter. Input is taken to ```search``` variable and check the condition inside forEach of json data(```data_list```) and if condition valid then push to a ```newData``` array.

```
 this.data_list.forEach(element => {
            if (element.name.toLowerCase().includes(this.search.toLowerCase()) ||
                element.iata != null &&
                element.iata.toLowerCase().includes(this.search.toLowerCase()) ||
                element.icao.toLowerCase().includes(this.search.toLowerCase()) ||
                element.latitude.toString().includes(this.search ||
                element.longitude.toString().includes(this.search))){
                    this.newdata.push(element);
              }
        })
```

![alt text](/src/assets/documentation/search.PNG "Search")

### Pagination 

This can input how much data should be displayed on each page.

![alt text](/src/assets/documentation/pagination.PNG "Paginate")
