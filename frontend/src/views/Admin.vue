<template>
    <div class="container">
        <div class="row">         
            <div class="col-md">              
                <div class="bloc">
                  <div class="text-center">
                    <h4>Liste des commentaires signalés</h4>    
                      <p>
                        <button type="button" 
                          class="btn btn-secondary"
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
                        </li>        
                     </ul>
                    </div> 
                </div>
            </div>        
              <div class="col-md">
                 <div class="bloc">
                   <div class="text-center">
                    <h4>Liste des Articles signalés</h4>
                    <p>
                       <button type="button" 
                       class="btn btn-secondary" 
                       @click="retrieveArticles">
                      Articles
                  </button>
                    </p>
                      <ul class="list-group text-left">
                        <li class="list-group-item shadow-lg"
                          v-for="(article, key) in articles"
                      :key="key" >
                      <div class="list-row text-center">
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
                      </li>
                    </ul>
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
        console.log('comment:', comment)
      },

      retrieveComments() {    
          
      userService.getAllCommentSignal(1)        
        .then(response => {
          this.comments = response.data;                    
          console.log("responseData", response.data); 
                   
        })
        .catch(e => {
          console.log(e);
        });
      },

      retrieveArticles() {
        userService.getAllArticleSignal(1)
          .then(response => {
            this.articles = response.data;
            console.log('responseData:', response.data)
            
          })
          .catch(e => {
          console.log(e);
        })
      },

      refresh() {
            location.reload();
      },   
     
    },   
   };

</script>

<style scoped>

  .list-group,.list-group-item   {
    border-radius: 20px;
    
  }  
  .list-row {
    border-radius: 10px;  
  }
 

</style>
