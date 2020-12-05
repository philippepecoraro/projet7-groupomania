<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="detail">

        <div class="text-left" v-if="currentArticle">

          <div class="text-center">
          <a class="btn btn-secondary btn-sm"
            :href= "'/home'" title="go to Articles List"
          >
            All Articles
          </a> 
          </div>    
          <div v-if="currentArticle.signal" class="text-warning text-center">
          <h4>Signal Selected Article</h4>
           </div> 

           <div v-else class="title text-center">
             <h4>Selected Article</h4>
            
           </div>   

              <div class="list-row text-center">
                <div>
                 <label><strong>Date:</strong></label><br/> {{ currentArticle.createdAt }}
                </div>
                <div>
                <label><strong>Article Author:</strong></label><br/> {{ currentArticle.User.firstname }} 
                  {{ currentArticle.User.lastname }}
                </div>                          
                <div>
                <label><strong>Title:</strong></label><br/> {{ currentArticle.title }}
                </div> 
                <div>
                <label><strong>Description:</strong></label><br/> {{ currentArticle.description }}
                </div> 
                </div>
                <div class="text-left">
                <label><strong>Text:</strong></label> {{ currentArticle.text }}
                </div>
                <div class="text-left">
                <label><strong>CurrentUserId:</strong></label> {{ currentUser.id }}
                </div>
                <div class="text-left">
                <label><strong>ArticleUserId:</strong></label> {{ currentArticle.userId }}
                </div>
                <div v-if="currentUser.id === currentArticle.userId">
                  <button class="btn btn-danger" @click="deleteOneArticle">
                    Remove 
                  </button>
                </div>    

                <div v-if="currentUser.id !== currentArticle.userId">     
                  <div v-if="currentArticle.signal">
                  <button class="btn btn-warning"  @click="signalArticle(false)">
                    Signal Article
                  </button>
                  </div>
                  <div v-else>
                  <button class="btn btn-warning"  @click="signalArticle(true)">
                    Signal Article
                  </button>
                  </div>
                
                </div>
            <p>_____________________________________________________</p>

                <div class="text-center">   
              <h5>Comments List</h5> 
              </div>            
                <div v-for="(comment, key) in comments"
                  :key="key">
                  <div v-if="comment.articleId === currentArticle.id">                             
                    <p>---------------------------------------------------</p>            
                    <p><strong>Date: </strong> {{ comment.createdAt}} </p>
                      <p><strong>Comment Author: </strong><br/> {{ comment.User.firstname }}
                      {{ comment.User.lastname }}</p>                       
                    <p><strong> Text: </strong>{{ comment.text}} </p>             
                    <p><strong>ArticleId: </strong>{{ comment.articleId}}  </p> 

                    <div v-if="comment.userId !== currentUser.id">             
                        <button class="btn btn-warning" @click="deleteOneArticle">
                          Signal comment
                        </button>
                    </div>           
                  </div>
                </div>                
                <div class="text-center">
                <a class="btn btn-secondary btn-sm"
                :href="'/articles/' + currentArticle.id"
                title="go to edit comment"
              >
                Edit comment
                </a> 
              </div>    
             <p>_____________________________________________________</p>

        </div>              
        <div v-else>
          <br />
            <p>Please click on a Article...</p>
            <div class="col-md-12">  
              <div class="bloc">         
                <h4>Articles List</h4>        
                    <ul class="list-group text-left">
                      <li class="list-group-item"           
                        v-for="(article, index) in articles"
                        :key="index" 
                        @click="setActiveArticle(article, index)"        
                      >   
                        <div class="list-row text-center">  
                          <p><strong>Creation date:</strong><br/> {{article.createdAt}}</p>

                          <p v-if="article.signal" class="text-warning"><strong>Signaled Article:</strong></p>

                          <p><strong>Article Author:</strong><br/> {{ article.User.firstname}}
                          {{ article.User.lastname }}</p>                      
                          <p><strong>Title:</strong><br/> {{ article.title }}</p> 
                           <p><strong>Description:</strong></p>
                           <p class="text-left"> {{ article.description}} </p>
                        </div>                                                                             
                      </li>
                    </ul>      
                         <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
                          Remove All
                        </button>                                    
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
      message: ""         
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
        userService.delete(this.currentArticle.id)
        .then(response => {
            console.log(response.data);
            this.refreshList();           
        })
    },
    signalArticle(status) {
      const data = {
        title: this.currentArticle.title,
        description: this.currentArticle.description,        
        text: this.currentArticle.text,
        userId: this.currentArticle.userId,
        signal: status
      }; 

       userService.update(this.currentArticle.id, data)
      .then(response => {
        console.log(response.data);
    //    this.signal = this.currentArticle.signal
        if (this.currentArticle.signal) {
        alert("Unsignaled");
        }
        else {
          alert("Signaled");
        }
        this.refreshList();
        this.message = "The article was updated successfully"

      })
    },


   /* searchTitle() {
      UserService.findByTitle(this.title)
        .then(response => {
          this.articles = response.data;
          console.log("responseFindTitle", response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },  */

    getComment(postId) {
      userService.getAllComment(postId)
      .then(response => {
        this.comments = response.data;       
        console.log('responsedata', response.data);
      })
      .catch(e => {
        console.log(e);
      })
    },
  },
  mounted() {
    this.retrieveArticles();   
  }
};
</script>

<style scoped>

.bloc {
  border: 2px green solid;
}
.list {
  background-color: #f7f7f7;
  text-align: center;
  max-width: 900px;
  margin: auto;
  border: 2px black solid;
}
.list-group { 
 /* height: 200px;*/
 width: auto;
  margin: auto;
 /* border: 2px solid blue;*/
}
.list-group-item {
  display: flex;
  flex-direction: column;
 /*background-color: #E1F5FE;*/
  background-color: #EEEEEE;
 /* height: 300px;*/
 /* width: auto;*/
  border: 2px solid black;
}
li span {
  text-align: left;
}
.detail {
 /*width: 100%;*/
  text-align: center;
  border: 1px black solid;
 /* height: auto;
  width: auto;*/
 /* background-color: cyan;*/
}
.btn {
  margin-bottom: 50px;
  margin-top: 20px;
}
/*
.signalTitle {
  background-color: #e0a800;
}*/
</style>