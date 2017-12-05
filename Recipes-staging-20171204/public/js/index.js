Vue.use(Vuetify);

/******************************************
The Central Event Bus Instance
*******************************************/
let EventBus = new Vue();

Vue.component('carousel-3d', Carousel3d.Carousel3d);
Vue.component('slide', Carousel3d.Slide);


var app = new Vue({
  el: "#app",
  data: {
    categories: [],
    currentRecipe: {},
    currentCategory: {},
    showRecipeInfo: false,
    showCategories: false,

  },
  methods: {

    getFoodCategories() {
      $.ajax({
        url: "/api/categories/",
        success: function (data) {
          app.categories = data;
          app.showCategories = true;
          app.setCategory(app.categories[0]);
          console.log(data);
        }
      })
    },
    //the currentCategory is set on the slide click
    setCategory(category) {
      console.log("Setting category: " + category.name);
      this.currentCategory = category;
      this.setRecipe(category.Recipes[0]);
      this.showRecipeInfo = false;

    },
    navCategory(category) {
      console.log("New category: " + category.name);
      this.currentCategory = category;
      this.setRecipe(category.Recipes[0]);
      this.showRecipeInfo = false;
      
    },
    setRecipe(recipe) {
      this.currentRecipe = recipe;
      this.showRecipeInfo = true;

    }
  },
  created: function () {
    this.getFoodCategories();
  },
  img: {
    name: "categories[1].name",
    image: "categories[1].image"
  },
})