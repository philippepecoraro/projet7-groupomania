<template>
<div class="container">
  <div class="submit-form text-center">
    <h4>Commentaire</h4>
      <div v-if="!submitted">        
        <div class="form-group">
         <label for="text"><strong>Texte</strong> (255 characters max) </label>
         <input
           type="text"
           class="form-control"
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
        <h4>Envoyé avec succès!</h4>
        <button class="btn btn-success" @click="newComment">Ajoutez un Commentaire</button>
      </div>       
        <div class="col-md-12 text-center">
          <div v-if="currentArticle" class="edit-form">
            <div class="text-center">
            <h4>Article</h4>
            </div>
            <div>
              <p><strong>Titre:</strong><br/> 
              {{ currentArticle.title }}</p>
            </div>
            <div>
              <p><strong>Description:</strong><br/>
               {{ currentArticle.description }}</p>
            </div>
            <div>
              <p><strong>Texte</strong><br/>
              {{ currentArticle.text}}</p>
            </div>
            <div>
              <p><strong>Article Id</strong><br/>
              {{ currentArticle.id}}</p>
            </div>
            <div>
              <p><strong>Article userId</strong><br/>
              {{ currentArticle.userId}}</p>
            </div>           
            <div class="text-center">
              <button class="badge badge-danger mr-2"
              @click="deleteArticle"
              >
              Supprimer Article
              </button> 
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
          console.log('response.data', response.data);
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
          console.log('response:', response)

          this.comment.id = response.data.id;
          console.log(response.data.id);
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
</style>