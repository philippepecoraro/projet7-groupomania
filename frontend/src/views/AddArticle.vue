<template>
  <div class="submit-form">
    <h4>Add article</h4>
       <form name="form" @submit.prevent="handleLogin">         
         <div class="form-group">
           <label for="title">Title</label>
             <input
              type="text"
              class="form-control"          
              id="title"    
              v-model="article.title"
              v-validate="'required'"
              name="title"
              placeholder="Enter title"           
            />
          <div v-if="submitted && errors.has('title')"
            class="alert alert-danger"
              role="alert"
            >Title is required!</div>       
         </div> 
          <div class="form-group">
            <label for="description">Description</label>
            <input
              type="text"
              class="form-control"                     
              id="description"       
              v-model="article.description"
              v-validate="'required'"
              name="description"
              placeholder="Enter description"           
            />
            <div v-if="submitted && errors.has('description')"
            class="alert alert-danger"
            role="alert"
            >
            Description is required</div>        
          </div>
          <div class="form-group">
            <label for="text">Text</label>
            <textarea
              class="form-control"          
              id="text"      
              v-model="article.text"
              v-validate="'required'"
              name="text"
              placeholder="Enter text"           
            ></textarea>
            <div v-if="submitted && errors.has('text')"
            class="alert alert-danger"
                role="alert"
              >Text is required!</div>
          </div>
          <div class="form-group">
          <button @click="saveArticle" class="btn btn-success">       
            Submit</button> 
          </div>             
        </form>    
    <p>
      <strong>CurrentId:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>CurrentFirstname:</strong>
      {{currentUser.firstname}}
    </p>
    <p>
      <strong>CurrentLastname:</strong>
      {{currentUser.lastname}}
    </p>
  </div>
</template>

<script>

import ArticleDataService from "../services/user.service"; 
    
export default {
  name: "add-article",
  data() {
    return {
      article: {
        id: null,
        title: "",
        description: "",
        text: "",     
        userId: ""
      },
      submitted: false,    
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    saveArticle() {
      const data = {
        title: this.article.title,
        description: this.article.description,
        text: this.article.text,
        userId: this.currentUser.id        
      };

    if (this.article.title && this.article.description && this.article.text) {
      ArticleDataService.create(data)
        .then(response => {
          this.article.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
    },    
    newArticle() {
      this.submitted = false;
      this.article = {};
    }, 
    handleLogin() {    
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (!isValid) {      
          window.alert('You submitted unsuccessfully!');
          return;
        }  else {             
              window.alert('You submitted successfully!');
              this.$router.push('/home');
            }                           
        }        
      );          
    }        
  }     
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>