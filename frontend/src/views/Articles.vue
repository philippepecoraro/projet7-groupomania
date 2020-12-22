<template>
   <div class="text-left shadow-lg" v-if="currentArticle">
            <div class="text-center">             
            </div>  
             <h1 class="title text-center">Article</h1>
            <div v-if="currentArticle.signal" class="blocSignal text-center">
              <p class="h4">Signalé</p>
            </div>  
                <div class="list-row text-center">
                <div>
                  <label><strong>Date:</strong></label><br/> 
                  {{ currentArticle.createdAt }}
                </div>
                <div>
                  <label><strong> Auteur de l'article:</strong></label><br/> 
                  



                </div>                          
                <div>
                  <label><strong>Titre:</strong></label><br/> 
                  {{ currentArticle.title }}
                </div> 
                <div>
                  <label><strong>Description:</strong></label><br/> 
                  {{ currentArticle.description }}
                </div> 
               </div>


                  <div class="blocText text-left p-3 mb-2 bg-white shadow-lg">
                  <label><strong>Texte:</strong></label><br/> 
                  {{ currentArticle.text }}
                  </div> 
                    <div v-if="currentUser.isAdmin || currentUser.id === currentArticle.userId">
                    <button class="btn btn-danger btn-sm shadow" 
                    title="Cliquez pour supprimer l'article"
                     @click="deleteOneArticle">
                      Supprimer Article
                    </button>
                  </div>                          
                  <div v-if="currentUser.isAdmin && currentArticle.signal">
                    <button class="btn btn-warning btn-sm shadow" 
                    title="Cliquez pour désignaler l'article"
                    @click="signalArticle(false)">
                      Désignaler Article
                  </button>
                  </div>
                  <div v-if="currentUser.id !== currentArticle.userId"> 
                    <div v-if ="currentArticle.signal === false">
                      <button class="btn btn-warning btn-sm shadow"
                       title="Cliquez pour signaler l'article" 
                        @click="signalArticle(true)">
                        Signaler Article
                     </button>
                    </div>                
                  </div>    
                  <div class="blocComment1"> 
                  <div class="text-center">   
                    <h2>Liste des commentaires</h2> 
                  </div> 
                  <div class="blocComment">          
                    <div class="text-left">                 
                      <div v-for="(comment, key) in comments" class="bloc2Comment shadow"
                      :key="key"                                       
                      >
                        <div v-if="comment.articleId === currentArticle.id" class="blocCommentBloc"> 
                          <div v-if="comment.signal" 
                          class="blocSignal text-center">
                          <p class="h5" >Commentaire signalé</p>
                          </div>                                  
                          <p class="text-center"><strong>Date: </strong><br/> 
                          {{ comment.createdAt}} </p>
                          <p class="text-center" ><strong>Auteur du commentaire: </strong><br/>
                           {{ comment.User.firstname }}
                          {{ comment.User.lastname }}</p>                       
                          <p class="blocComment p-3 mb-2 bg-white shadow"><strong> Texte: </strong><br/>
                          {{ comment.text}} </p>                                               
                        </div> 
                        <div v-if="(comment.userId !== currentUser.id) && comment.signal !== true"> 
                          <button class="btn btn-warning btn-sm shadow" 
                          title="Cliquez pour signaler le commentaire" 
                          @click="signalComment(comment.id, true)">
                            Signaler Commentaire
                          </button>
                        </div>
                        <div v-if="currentUser.isAdmin && comment.signal">
                          <button class="btn btn-warning btn-sm shadow" 
                          title="Cliquez pour désignaler le commentaire" 
                          @click="signalComment(comment.id, false)">
                            Désignaler commentaire
                          </button>
                        </div>                 
                      </div>                   
                    </div>
                  </div>
                 </div>
                

               <div class="row">
        <div class="col-md-12 text-center">
          <div class="text-center">
            <h3>Ajoutez un commentaire</h3>
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


          </div>     
    
</template>

<script>

/*  {{ currentArticle.User.firstname }} 
                    {{ currentArticle.User.lastname }}*/


import userService from '../services/user.service';
export default {
    name: 'Article',
    data() {
        return {
          comment: {
            text: "",
            articleId: "",
            userId: ""
          },
        articles:[],
        currentArticle: null,
        currentIndex: -1,
        title: "",
        comments:[],   
        message: "",   
      //  currentComment: null,
        currentKey: -1,
        submitted: false
        };
    },
     computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
    methods: {
   /*     retrieveArticles() {
      userService.getAll()
        .then(response => {    
          this.articles = response.data;              
        })
        .catch(e => {
          console.log(e);
        });
    },*/     
  
    /*refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;       
    },*/
   /* setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      this.getComment(article.id);           
    },    */  
    
   /* removeAllArticles() {
      userService.deleteAll()
        .then(response => {
          console.log("responseRemove:" ,response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },   */
 /*   retrieveArticles() {
      this.currentArticle = this.article.id;   
       this.getComment(this.article.id);
      //  this.getArticle();
    },  */

    deleteOneArticle() {
      if ( confirm("Etes vous sur de vouloir supprimer cet article ?")) {
        userService.delete(this.currentArticle.id)
        .then(response => {
            console.log(response.data);  
               this.$router.push('/home');       
         //   this.refreshList();  
            //    document.location.reload();  

        })
      }
      else{
           console.log("Vous avez annulé la demande");   
      }
    },
    signalArticle(status) {      
      const data = {       
        signal: status
      }; 
       userService.update(this.currentArticle.id, data)
      .then(response => {
        console.log(response.data);   
        if (this.currentArticle.signal) {
        alert("Article désignalé");
      //  document.location.reload();
        }
        else {
          alert("Article signalé");
        }
       // this.refreshList();   
        document.location.reload();
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
        //document.location.reload();
        }
        else {
          alert("Commentaire désignalé");
         // document.location.reload();
        }
       // this.refreshList(); 
             document.location.reload();

      })
    }, 
                     
    getComment(postId) {
      userService.getAllComment(postId)
      .then(response => {
        this.comments = response.data;         
      })
      .catch(e => {
        console.log(e);
      })
    },
        getArticle(id) {
      userService.get(id)
        .then(response => {
          this.currentArticle = response.data;                  
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
      userService.createComment(data)
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
    },
   
  },
    mounted() {
      this.message = '';
      this.getArticle(this.$route.params.id);   
      console.log(' this.$route.params.id:', this.$route.params.id);
      this.getComment(this.$route.params.id);
  
    console.log('this.article:', this.article);
    console.log('this.comment:', this.comment);
    console.log('this.currentArticle:', this.currentArticle);
    console.log('this.currentComment:',this.currentComment);
    }  

    };

</script>

<style scoped>
.blocSignal {
  background-color: #FDD835;
  width: auto;
}

</style>