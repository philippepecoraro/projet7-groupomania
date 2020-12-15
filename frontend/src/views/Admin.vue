<template>
    <div class="container">
      <div v-if="currentUser.isAdmin">
      <h1 class="text-center">Commentaires et articles signalés</h1> 
       <div class="jumbotron"> 
         <div class="row">  
            <div class="col-lg-6">              
                <div class="bloc">
                  <div class="text-center">
                    <h2>Liste des commentaires signalés</h2>    
                      <p>
                        <button type="button" 
                          class="btn btn-secondary"
                          title="Cliquez pour afficher la liste des commentaires signalés"
                          @click="retrieveComments">
                          Commentaires
                        </button>                
                      </p>                   
                      <ul class="list-group text-left">
                        <li class="list-group-item shadow-lg"
                          v-for="(comment, key) in comments"
                          :key="key" 
                         > 
                           <div class="list-row text-center">
                              <p class="blocSignal"><strong>Commentaire signalé</strong></p>                          
                              <p><strong>Date:</strong><br/> 
                              {{ comment.createdAt}}                                      
                              <p><strong>Auteur:</strong><br/> 
                              {{ comment.User.firstname }}                          
                              {{ comment.User.lastname }}</p>
                            </div>
                            <div class="list-row text-left shadow">
                              <p><strong>Texte:</strong><br/> 
                              {{ comment.text}} </p>                                             
                            </div>
                            <div class="row">
                              <div class="text-left">
                                <button class="btn btn-warning btn-sm shadow" 
                                   title="Cliquez pour désignaler le commentaire" 
                                   @click="signalComment(comment.id, false)">
                                   Désignaler commentaire
                                </button>
                              </div>
                              <div class="text-right">
                                <button class="btn btn-danger btn-sm shadow" 
                                  title="Cliquez pour supprimer l'article"
                                  @click="deleteOneComment(comment.id)">
                                  Supprimer Commentaire
                                </button>
                              </div>
                            </div>
                         </li>        
                      </ul>
                   </div> 
                </div>
            </div>        
              <div class="col-lg-6">
                 <div class="bloc">
                   <div class="text-center">
                    <h2>Liste des Articles signalés</h2>
                    <p>
                      <button type="button" 
                       class="btn btn-secondary"
                       title="Cliquez pour afficher la liste des articles signalés" 
                       @click="retrieveArticles">
                      Articles
                      </button>
                    </p>
                      <ul class="list-group text-left">
                        <li class="list-group-item shadow-lg"
                          v-for="(article, key) in articles"
                          :key="key" >
                            <div class="list-row text-center">
                              <p class="blocSignal"><strong>Article signalé</strong></p> 
                              <p><strong>Date</strong><br/> 
                              {{ article.createdAt}}                                               
                              <p><strong>Auteur:</strong><br/> 
                              {{ article.User.firstname }}                         
                              {{ article.User.lastname }}</p>
                              <p><strong>Titre:</strong><br/>
                              {{ article.title }}</p>
                              <div class="list-row text-left shadow"> 
                              <p><strong>Description:</strong><br/>
                              {{ article.description }}</p>
                              </div>
                              <div class="list-row text-left shadow">
                                <p><strong>Texte:</strong><br/>
                                {{ article.text }}</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="text-left">
                                <button class="btn btn-warning btn-sm shadow" 
                                title="Cliquez pour désignaler l'article"
                                @click="signalArticle(article.id, false)">
                                Désignaler Article
                                </button>
                              </div>
                              <div class="text-right">
                                <button class="btn btn-danger btn-sm shadow" 
                                title="Cliquez pour supprimer l'article"
                                @click="deleteOneArticle(article.id)">
                                Supprimer Article
                                </button>
                              </div>                        
                            </div>                        
                        </li>
                     </ul>
                  </div>
                 </div>
              </div>
          </div>
       </div> 
    </div>
    </div>              
</template>

<script>

import userService from '../services/user.service';
export default {
    name: 'Admin',
    data() {
        return {
            articles:[],
            comments:[],
            currentArticle: null,
            currentComment: null,
            currentKey: -1
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {

      setActiveComment(comment, key) {
        this.currentComment = comment;
        this.currentKey = key;
        this.retrieveComments(comment.signal);        
      },

      retrieveComments() {             
      userService.getAllCommentSignal(1)        
        .then(response => {
          this.comments = response.data;                                
        })
        .catch(e => {
          console.log(e);
        });
      },

      retrieveArticles() {
        userService.getAllArticleSignal(1)
          .then(response => {
            this.articles = response.data;                       
          })
          .catch(e => {
          console.log(e);
        })
      },

      deleteOneArticle(article) {                
      if ( confirm("Etes vous sur de vouloir supprimer cet article ?")) {
        userService.delete(article)
        .then(response => {  
            console.log(response);                   
            this.retrieveArticles();           
        })
      }
      else{
           console.log("Vous avez annulé la demande");   
      }
    },

     signalArticle(article, status) {      
      const data = {       
        signal: status
      }; 
       userService.update(article, data)
      .then(response => {
        console.log(response.data);   
        if (!status) {
        alert("Article désignalé");
        }
        else {
          alert("Article signalé");
        }      
       this.retrieveArticles();
      })
    },
    signalComment(comment, status) {         
          const data = {
           signal: status,
         }       
      
       userService.updateComment(comment, data)
      .then(response => {
        console.log(response.data);       
        if (status) {          
        alert("Commentaire signalé");
        }
        else {
          alert("Commentaire désignalé");
        }
        this.retrieveComments();       
      })
    }, 

    deleteOneComment(comment) {
      if ( confirm("Etes vous sur de vouloir supprimer ce commentaire ?")) {
        userService.deleteComment(comment)
        .then(response => {
          console.log(response.data);
          this.retrieveComments();
        })
    }
    else{
           console.log("Vous avez annulé la demande");   
      }
    },      
   }
};

</script>

<style scoped>

h1 {
  margin-bottom: 50px;
}
h2 {
  font-size: 1.5rem;
}

.list-group,.list-group-item {
  border-radius: 20px;    
  }  
.list-row {
  border-radius: 10px; 
  padding: 10px; 
  }
  .blocSignal {
  background-color: #FDD835;
  width: auto;
}
 

</style>
