<template>
  <div class="container">
    <h3 class="text-center">Profile</h3>
    <header class="jumbotron">            
      <form name="form" @submit.prevent="updateUser">
        <div class="row">
          <div class="col">
        <div class="form-group">
          <label for="firstname">
          <strong>Firstname:</strong></label>
          {{currentUser.firstname}}
          <input type="text" 
          class="form-control"
          id="firstname"
          v-model="user.firstname"
          name="firstname"
          placeholder="Enter your firstname"
          />
        </div>
        </div>
        <div class="col">
        <div class="form-group">
          <label for="lastname">
          <strong> Lastname:</strong></label>
          {{currentUser.lastname}}
          <input type="text"
          class="form-control" 
          id="lastname"
          v-model="user.lastname"
          name="lastname"
          placeholder="Enter your lastname"
          />
        </div>
        </div>
        </div> 
        <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>            
      </form>
    </header>    
    <p>
      <strong>Email:</strong><br/>
      {{currentUser.email}}
    </p>
    <strong>Administrator:</strong>
    <p>             
    </p>  
    <p  v-if="currentUser.isAdmin">        
       <strong>You are administrator</strong>
    </p>
    <p v-else>
        <strong>You are not administrator</strong>
    </p>
    <div class="text-center"> 
    <p><strong>Delete your account</strong></p> 
    <button @click="deleteAccount" class="btn btn-danger" type="button">Account delete</button>
    </div>
  </div>  
</template>

<script>

import User from '../services/auth.service'

export default {
  name: 'Profile',
  data() {
    return {    
      user: {
      firstname: "",
      lastname: ""    
      },  
    };
  },

  computed: {
    currentUser() {      
      return this.$store.state.auth.user;       
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }        
  },  
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');      
    }
    console.log(this.$store.state.auth.user);
    console.log(this.$store.state.auth.status.loggedIn);
  }, 
  methods: {
          logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      },
     
   updateUser() {
      const data = {
        firstname: this.user.firstname,
        lastname: this.user.lastname
      };
      User.updateName(this.currentUser.id, data)   
      .then(data => {
        console.log(data);
        console.log('currentuserfirstname:', this.currentUser.firstname);
        console.log('currentuserlastname:', this.currentUser.lastname);     
        console.log('userFirstname:', this.user.firstname)     
        console.log('userlasttname:', this.user.lastname)
         sessionStorage.setItem('user', JSON.stringify(this.user));
         console.log('user:', this.user);
         console.log('currentUser:', this.currentUser);
        alert('The User was updated successfully!')
        this.logOut();     
      })
       .catch(e => {
          console.log(e);
        });
    }, 
    deleteAccount() {
       if ( confirm("Are you sure to delete your account")) {
        
      User.deleteUser(this.currentUser.id)
      .then(response => {
        console.log('response:', response)
        sessionStorage.removeItem('user');
        this.logOut();
        })
       }
        else {
          console.log("cancelled");
        }             
      
    }
  }     

 };  


</script>