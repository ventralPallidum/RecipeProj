Vue.use(Vuetify);

var app = new Vue({
  el:"#app",
  data: {

      categories: [],
      currentStep: 1,
      currentCategory: {},
      ingredients: [],
      ingredient: "",
      directions: [],
      direction:"",
      recipeName: "",
      stepNextText: "Continue",
      stepBackText: "Back",
      stepSubmitText: "Submit",
      toolbarColor: "pink",
      clearable:false,
      addedFood:true,
      addedRecipe:false,
      custom:true,

  },
  computed: {

    progress() {
      return Math.min(120, this.direction.length * 1)
    },
    color() {
      return ['success', 'warning', 'error'][Math.floor(this.progress / 60)]
    }
  },

  methods: {
    FoodCategories() {
      $.ajax({
        url: "/api/categories/",
        success: function(data) {
          app.categories = data;

        }
      })
    },
    AddRecipe(recipe){

      console.log(recipe)



    },

    addIngredient(ingredient){
       if(ingredient.length < 120 && ingredient.length > 0){
        this.ingredient= ""
        this.ingredients.push(ingredient);
        console.log(ingredient)
        this.clearable= true;

      }
    },
    addDirection(direction){
       if(direction.length < 120 && direction.length > 0){
        this.direction= ""
        this.directions.push(direction)
        console.log(direction)
        this.clearable= true

       }


    },
    addFoodToDatabase: function() {
  $.ajax({
    method: "POST",
    url: "/api/entry",
    data: {
      category: this.currentCategory,
      recipeName: this.recipeName,
      ingredients: this.ingredients,
      directions:this.directions,
    },
    success: function(data) {
      app.addedRecipe = true;
      setTimeout(function(){
          app.addedRecipe= false;
        },2000)
    }
  })
},


  },
    created: function() {
      this.FoodCategories();

  },
})
