<template>
  <div class="container">
    <div class="list row">
      <div class="col-md-12">
        <div class="detail shadow">
          <div class="text-left shadow-lg" v-if="currentArticle">
            <div class="text-center">
              <a class="btn btn-secondary btn-lg shadow-lg" role="button"
              :href= "'/home'" title="Cliquez pour rejoindre la page d'accueil"
              >
              Liste des Articles
              </a> 
            </div>    
            <div v-if="currentArticle.signal" class="text-warning text-center">
              <p class="h4">Article signalé</p>
            </div> 
            <div v-else class="title text-center">
              <h2>Article</h2>            
            </div>  
              <div class="list-row text-center">
                <div>
                  <label><strong>Date:</strong></label><br/> 
                  {{ currentArticle.createdAt }}
                </div>
                <div>
                  <label><strong> Auteur de l'article:</strong></label><br/> 
                  {{ currentArticle.User.firstname }} 
                    {{ currentArticle.User.lastname }}
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
                  <div class="text-center">   
                    <h3>Liste des commentaires</h3> 
                  </div> 
                  <div class="blocComment">          
                    <div class="text-left">                 
                      <div v-for="(comment, key) in comments" class="bloc2Comment shadow"
                      :key="key"                                       
                      >
                        <div v-if="comment.articleId === currentArticle.id" class="blocCommentBloc"> 
                          <div v-if="comment.signal" 
                          class="text-warning text-center">
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
                <div class="text-center">
                  <a class="btn btn-secondary btn-sm shadow"
                  :href="'/articles/' + currentArticle.id"
                  title="Cliquez pour créer un nouveau commentaire"
                  >
                  Creer un nouveau commentaire
                  </a> 
                </div>           
          </div>                 
          <div v-else>             
            <div class="col-md-12">  
              <div class="bloc">         
                <h1>Liste des Articles</h1> 
                  <p>Click sur un article...</p>
                    <ul class="list-group text-left">                     
                      <li class="list-group-item shadow-lg"           
                        v-for="(article, index) in articles"
                        :key="index" 
                        @click="setActiveArticle(article, index)"        
                        >   
                          <div class="list-row text-center">  
                            <p><strong>Date de Creation:</strong><br/> 
                            {{article.createdAt}}</p>
                            <p v-if="article.signal" 
                            class="text-warning"><strong>Article signalé</strong></p>
                            <p><strong>Auteur de l'article:</strong><br/> 
                            {{ article.User.firstname}}
                            {{ article.User.lastname }}</p>                      
                            <p><strong>Titre:</strong><br/> 
                            {{ article.title }}</p> 
                            <p><strong>Description:</strong></p>
                            <p> {{ article.description}} </p>                          
                          </div>                                                                             
                      </li>                      
                    </ul>                         
                        <button v-if="currentUser.isAdmin" 
                        class="m-3 btn btn-sm btn-danger"
                         @click="removeAllArticles">
                          Supprimez tous les articles
                        </button>                                                              
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
  name: 'Home',
  data() {
    return {
      articles:[],
       currentArticle: null,
      currentIndex: -1,
      title: "",
      comments:[],   
      message: "",   
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
    retrieveArticles() {
      userService.getAll()
        .then(response => {
          this.articles = response.data;
          console.log('dataArticles:',response.data);             
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;       
    },
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      this.getComment(article.id);      
    },      
    
    removeAllArticles() {
      userService.deleteAll()
        .then(response => {
          console.log("responseRemove:" ,response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },   
    deleteOneArticle() {
      if ( confirm("Etes vous sur de vouloir supprimer cet article ?")) {
        userService.delete(this.currentArticle.id)
        .then(response => {
            console.log(response.data);            
            this.refreshList();           
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
        alert("Désignalé");
        }
        else {
          alert("Signalé");
        }
        this.refreshList();
        this.message = "The article was updated successfully"

      })
    },

     signalComment(comment, status) {                   
          const data = {
           signal: status,
         }       
      
       userService.updateComment(comment, data)
      .then(response => {
        console.log(response.data);
        console.log(comment);
        console.log(data);  
        if (status) {          
        alert("Signalé");
        }
        else {
          alert("Désignalé");
        }
        this.refreshList();
        this.message = "The article was updated successfully"

      })
    }, 
                     
    getComment(postId) {
      userService.getAllComment(postId)
      .then(response => {
        this.comments = response.data;       
        console.log('responsedata', response.data);
      })
      .catch(e => {
        console.log(e);
      })
    }
  },

  mounted() {
    this.retrieveArticles();   
   }
  };

</script>

<style scoped>

.list {
  background-color: #f7f7f7;
  text-align: center;
  max-width: 900px;
  margin: auto;
}
.list-group { 
 width: auto;
  margin: auto; 
  border-radius: 20px;
}
.list-group-item {
  display: flex;
  flex-direction: column; 
  background-color: #EEEEEE; 
  border-radius: 20px;
}
li span {
  text-align: left;
}
.detail {
  text-align: center; 
  border-radius: 10px;
}
.btn {
  margin-bottom: 50px;
  margin-top: 20px;
}
.blocComment {
  border-radius: 20px;
 /* border: 1px black solid;*/
}
.blocText {
  border-radius: 20px;
}
.blocCommentBloc {
   border-radius: 20px;
/*  border: 1px black solid;*/
}
.bloc2Comment {
 /* border: 1px black solid;*/
  border-radius: 20px;
}


</style>