<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user">
                    <div class="widget-user-header text-white" style="background: url('img/photo1.png') center center;">
                        <h3 v-html="form.name" class="widget-user-username text-right"></h3>
                        <h5 class="widget-user-desc text-right" v-html="form.type.charAt(0).toUpperCase()+form.type.slice(1)"></h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" src="img/user_profile_photo.jpg" alt="User Profile Photo">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4">
                            <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-5">
                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                        <li class="nav-item"><a class="nav-link " href="#activity" data-toggle="tab">Activity</a></li>
                        <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <div class=" tab-pane" id="activity">
                                <!-- Post -->
                                <div class="post">
                                    <div class="user-block">
                                        <img class="img-circle img-bordered-sm" src="img/user_profile_photo.jpg" alt="user image">
                                        <span class="username">
                                        <a href="#">Jonathan Burke Jr.</a>
                                        <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                        </span>
                                        <span class="description">Shared publicly - 7:30 PM today</span>
                                    </div>
                                    <!-- /.user-block -->
                                    <p>
                                        Lorem ipsum represents a long-held tradition for designers,
                                        typographers and the like. Some people hate it and argue for
                                        its demise, but others ignore the hate as they create awesome
                                        tools to help create filler text for everyone from bacon lovers
                                        to Charlie Sheen fans.
                                    </p>

                                    <p>
                                        <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
                                        <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
                                        <span class="float-right">
                                        <a href="#" class="link-black text-sm">
                                            <i class="far fa-comments mr-1"></i> Comments (5)
                                        </a>
                                        </span>
                                    </p>

                                    <input class="form-control form-control-sm" type="text" placeholder="Type a comment">
                                </div>
                                <!-- /.post -->
                            </div>
                            <div class="active tab-pane" id="settings">
                                <form class="form-horizontal" @submit.prevent="updateProfile()">
                                    <div class="form-group row">
                                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                        <div class="col-sm-10">
                                        <input type="text" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                        <div class="col-sm-10">
                                        <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputExperience" class="col-sm-2 col-form-label">Bio</label>
                                        <div class="col-sm-10">
                                        <textarea class="form-control" v-model="form.bio" id="inputExperience" placeholder="Experience"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputSkills" class="col-sm-2 col-form-label">Photo</label>
                                        <div class="input-group col-sm-10">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" @change="uploadProfilePicture()" id="fileInput">
                                                <label class="custom-file-label" for="exampleInputFile" id="fileNameLabel">Choose file</label>
                                            </div>
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="uploadProfilePicButton" >Upload</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="offset-sm-2 col-sm-10">
                                        <button type="submit" class="btn btn-danger">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
           return {
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
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            loadUserProfileInfo(){
                axios.get('api/profile').then(({data}) => (this.form.fill(data)));
            },
            uploadProfilePicture(){
                let fileName = $('#fileInput')[0].files[0].name;
                const toDataURL = url => fetch(url)
                                        .then(response => response.blob())
                                        .then(blob => new Promise((resolve, reject) => {
                                            const reader = new FileReader()
                                            reader.onloadend = () => resolve(reader.result)
                                            reader.onerror = reject
                                            reader.readAsDataURL(blob)
                                        }))
                toDataURL(fileName)
                    .then(dataUrl => {
                        console.log('RESULT:', dataUrl)
                        this.form.photo = dataUrl
                    })
            },
            updateProfile(){
                swal.fire({
                    title: 'Update Profile Info',
                    text: "Are you sure you want to update your info?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Update'
                    }).then((result) => {
                    if (result.value) {
                        this.$Progress.start()
                        this.form.put('/api/profile/' + this.form.id).then((formUpdateResult)=>{
                        Fire.$emit('AfterUpdate')
                        toast.fire({
                            icon:'success',
                            type:'success',
                            title:formUpdateResult.data.message.toString(),
                        })
                        this.$Progress.finish()
                        }).catch((formDeleteErr)=> {
                        swal.fire(
                            'Error has occurred!',
                            'Unable to update your profile info',
                            'error'
                        )
                        this.$Progress.fail()
                        })
                    }
                })
            }
            
        },
        created() {
            this.loadUserProfileInfo();
        }
    }
</script>
