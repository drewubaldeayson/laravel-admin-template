<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
                <button class="btn btn-success" @click="openModal()"><i class="fa fa-user-plus"></i> Add User</button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Created At</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type | upText}}</td>
                  <td>{{ user.created_at | dateTime}}</td>
                  <td>
                    <a href="#" @click="openEditableModal(user)">
                        <i class="fa fa-edit"></i>
                    </a>
                    <span class="ml-1"></span>
                    <a href="#" @click="deleteUser(user.id)">
                        <i class="fa fa-trash text-red"></i>
                    </a>
                  </td>
                </tr>
        
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 v-show="!editMode" class="modal-title">Add New User</h5>
                    <h5 v-show="editMode" class="modal-title">Update User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode ? updateUser() : createUser()">
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name" placeholder="Enter your Name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email" placeholder="Enter your Email Address"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="form-group">
                            <textarea v-model="form.bio" name="bio" id = "bio" placeholder="Write your short bio"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>
                        <div class="form-group">
                            <select v-model="form.type" name="type" id = "type"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="" disabled selected>Select User Role</option>
                                <option value="admin" >Admin</option>
                                <option value="user" >Standard User</option>
                                <option value="author" >Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" placeholder="Enter your password"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button v-show="!editMode" type="submit" class="btn btn-primary">Add</button>
                        <button v-show="editMode" type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          editMode: false,
          users: {},
          form: new Form({
              id: '',
              name: '',
              email: '',
              password: '',
              type: '',
              bio: '',
              photo: ''
          })
      }
  },
  methods: {
      resetForm(){
        this.form.reset();
        this.form.clear();
      },
      openModal(){
        this.editMode = false;
        this.resetForm();
        $("#userModal").modal("show")
      },
      openEditableModal(user){
        this.editMode = true;
        this.resetForm();
        $("#userModal").modal("show");
        this.form.fill(user);
      },
      createUser(){
          this.$Progress.start()
          this.form.post('api/user').then((addUserResult)=>{
            Fire.$emit('AfterCreate')
            $("#userModal").modal("hide")
            toast.fire({
              type:'success',
              icon:'success',
              title:addUserResult.data.message.toString()
            })
            this.$Progress.finish()
          }).catch((err)=>{
            if(!err.message.toString().includes('422')){
              swal.fire(
                'Error has occurred!',
                "Error in adding user",
                'error'
              )
            }
             this.$Progress.fail()
          })
      },
      loadUsers(){
          axios.get('api/user').then(({data}) => (this.users = data.data));
      },
      deleteUser(user_id){
        swal.fire({
          title: 'Are you sure you want to delete it?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.$Progress.start()
            this.form.delete('/api/user/'+user_id).then((formDeleteResult)=>{
              Fire.$emit('AfterDelete')
              toast.fire({
                icon:'success',
                type:'success',
                title:formDeleteResult.data.message.toString(),
              })
              this.$Progress.finish()
            }).catch((formDeleteErr)=> {
              swal.fire(
                'Error has occurred!',
                'Unable to delete this user',
                'error'
              )
              this.$Progress.fail()
            })
          }
        })
      },
      updateUser(){
        swal.fire({
          title: 'Update Info',
          text: "Are you sure you want to update the record of this user?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Update'
        }).then((result) => {
          if (result.value) {
            this.$Progress.start()
            this.form.put('/api/user/' + this.form.id).then((formUpdateResult)=>{
              Fire.$emit('AfterUpdate')
              $("#userModal").modal("hide")
              toast.fire({
                icon:'success',
                type:'success',
                title:formUpdateResult.data.message.toString(),
              })
               this.$Progress.finish()
            }).catch((formDeleteErr)=> {
              swal.fire(
                'Error has occurred!',
                'Unable to update the record of this user',
                'error'
              )
               this.$Progress.fail()
            })
          }
        })

      }
  },
  created() {
    this.loadUsers();
    // setInterval(()=>{this.loadUsers()},3000);
    Fire.$on('AfterCreate',()=>{
      this.loadUsers();
    });

    Fire.$on('AfterDelete',()=>{
      this.loadUsers();
    })

    Fire.$on('AfterUpdate',()=>{
      this.loadUsers();
    })

  }
};
</script>
