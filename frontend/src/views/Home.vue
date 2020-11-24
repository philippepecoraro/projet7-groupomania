<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>    

<div class="col-md-12">
  <div class="detail">
    <div v-if="currentArticle">
       <h4>Selected Article</h4>
          <div>
          <label><strong>Firstname:</strong></label> {{ currentUser.firstname }}
        </div>
        <div>
          <label><strong>Lastname:</strong></label> {{ currentUser.lastname }}
        </div>
        <div>
          <label><strong>Date:</strong></label> {{ currentArticle.createdAt }}
        </div>
        <div>
          <label><strong>Title:</strong></label> {{ currentArticle.title }}
        </div>       
        <div>
          <label><strong>Text:</strong></label> {{ currentArticle.text }}
        </div>               

        <a class="badge badge-warning"
          :href="'/articles/' + currentArticle.id"
        >
          Click for edit article
        </a>                
     </div>
     <div v-else>
        <br />
        <p>Please click on a Article...</p>
      </div>
  </div>
</div>
    <div class="col-md-12">  
        <div class="bloc"> 
      <h4>Articles List</h4> 
       
      <ul class="list-group">
        <li class="list-group-item"         
        
          v-for="(article, index) in articles"
          :key="index" 
           @click="setActiveArticle(article, index)"        
        >                             
         <p><strong>ArticleCreatedAt:</strong>{{ article.createdAt}} </p>
         <p><strong>ArticleTitle:</strong>{{ article.title }}  </p>
         <p><strong>ArticleUserId:</strong>{{ article.UserId }}  </p>
         <p><span><strong>ArticleDescription:</strong> {{ article.description}}</span> </p>

         <p><strong>currentUser-firstname:</strong>{{ currentUser.firstname}}</p>
         <p><strong>currentUser-lastname:</strong>{{ currentUser.lastname}}</p>
              
        </li>
      </ul>        

           <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
        Remove All
      </button>  
           
    </div> 
</div>  
  </div>  
</template>

<script>
import UserService from '../services/user.service';

//Mise en surbrillance
// :class="{ active: index == currentIndex }"

export default {
  name: 'Home',
  data() {
    return {
      articles:[],
       currentArticle: null,
      currentIndex: -1,
      title: ""      
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    retrieveArticles() {
      UserService.getAll()
        .then(response => {
          this.articles = response.data;
          console.log('dataArticles:',response.data);          
          console.log(response.data);
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

    //  this.$router.push('/articles'/+ currentArticle.id);
    },
    removeAllArticles() {
      UserService.deleteAll()
        .then(response => {
          console.log("responsedata:" ,response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },    
    searchTitle() {
      UserService.findByTitle(this.title)
        .then(response => {
          this.articles = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
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
  border: 2px black solid;

}
.list-group { 
  height: 200px;
 width: auto;
  margin: auto;
 /* border: 2px solid blue;*/
}
.list-group-item {
  display: flex;
  flex-direction: column;
 /*background-color: #E1F5FE;*/
  background-color: #EEEEEE;
  height: 300px;
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
  height: auto;
  width: auto;
  background-color: cyan;
}
</style>