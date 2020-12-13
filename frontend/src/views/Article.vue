<template>
  <div class="container">
    <div class="row">
        <div class="col-md-10 text-center">
          <div class="text-center">
            <h1>Commentaire</h1>
              <div v-if="!submitted">        
                <div class="form-group">
                <label for="text"><strong>Texte</strong> (255 caractères max) </label>
                <input
                  type="text"
                  class="form-control shadow-lg"
                  id="text"          
                  v-model="comment.text"
                  name="text"
                  placeholder="Entrez votre texte"         
                  />    
                  <div class="form-group text-left">
                  <button @click="saveComment" class="btn btn-primary">       
                    Submit</button> 
                  </div>                 
                </div>
              </div>              
              <div v-else>
                <p class="h4">Envoyé avec succès!</p>
                <button class="btn btn-success" @click="newComment">Ajoutez un Commentaire</button>
              </div> 
          </div>
        </div> 
    </div>
        <div class="row">
          <div class="col-md-10 articleBord shadow">
            <div v-if="currentArticle">
              <div class="text-center">
              <h2>Article</h2>       
              <div>
                <p><strong>Titre:</strong><br/> 
                {{ currentArticle.title }}</p>
              </div>
              <div>
                <p><strong>Description:</strong><br/>
                {{ currentArticle.description }}</p>
              </div>
              </div>
              <div>
                <p><strong>Texte</strong><br/>
                {{ currentArticle.text}}</p>
              </div>             
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import ArticleDataService from "../services/user.service";

export default {
  name: "article-comment",
  data() {
    return {
      comment: {      
        text: "",
        articleId: "",
        userId: ""
      },
      currentArticle: null,
      message: '',
      submitted: false     
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getArticle(id) {
      ArticleDataService.get(id)
        .then(response => {
          this.currentArticle = response.data;          
        })
        .catch(e => {
          console.log(e);
        });
    },
  
    deleteArticle() {
      ArticleDataService.delete(this.currentArticle.id)
        .then(response => {
          console.log(response.data);
          this.$router.push('/home');
        })
        .catch(e => {
          console.log(e);
        });
    },
      saveComment() {
      const data = {
        text: this.comment.text,
        articleId: this.currentArticle.id,     
        userId: this.currentUser.id       
      };

    if (this.comment.text) {
      ArticleDataService.createComment(data)
        .then(response => {
          this.comment.id = response.data.id;      
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
    },  
    newComment() {
     this.submitted = false;
     this.comment = {};    
    }
  },
    mounted() {
      this.message = '';
      this.getArticle(this.$route.params.id);      
    }  
};

</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.articleBord {
  border-radius: 25px;
}

</style>