var ClientApi = function(){
    function post(data, url, cb){
        $.post(url, data)
            .done(function(data){
                cb(data);
            })
    }

    function get(url, cb){
        $.get(url)
            .done(function(data){
                cb(data);
            })
    }

    function callback(data){
        console.log(data);
    }

    return {
        signUpUser: function(){
            var data = {
                password: "1111",
                mail: "alex@mail.com",
                firstname: "Alex",
                secondname: "Lennon"
            };

            var url = "/api/sign-up-user";

            post(data, url, callback);
        },
        changeMailUser: function(){
            var data = {
                mail: "alex.loud@mail.com"
            };

            var url = "/api/change-mail-user";

            post(data, url, callback);
        },
        changePasswordUser: function(){
            var data = {
                password: "2222"
            };

            var url = "/api/change-password-user";

            post(data, url, callback);
        },
        changeMailCompany: function(){
            var data = {
                mail: "alex.com@mail.com"
            };

            var url = "/api/change-mail-company";

            post(data, url, callback);
        },
        changePasswordCompany: function(){
            var data = {
                password: "2222"
            };

            var url = "/api/change-password-company";

            post(data, url, callback);
        },
        signUpCompany: function(){
            var data = {
                companyName: "AlexInc",
                password: "1111",
                mail: "alex.inc@mail.com"
            };

            var url = "/api/sign-up-company";

            post(data, url, callback);
        },
        logout: function(){
            post("", "/api/logout", callback);
        },
        signInUser: function(){
            var data = {
                mail: "alex@mail.com",
                password: "1111"
            };

            var url = "/api/sign-in";

            post(data, url, callback);
        },
        signInCompany: function(){
            var data = {
                mail: "alex.inc@mail.com",
                password: "1111"
            };

            var url = "/api/sign-in";

            post(data, url, callback);
        },
        getInfoUser: function(){
            var url = "/api/user/54b6ac89873dfb58723e4045"
            get(url, callback);
        },
        getInfoCompany: function(){
            var url = "/api/company/54c14a09c718c94f721b7765"
            get(url, callback);
        },
        getAuth: function(){
            var url = "/api/get-status"
            get(url, callback);
        },
        editUser: function(){
            var data = {};

            data.firstname = "Alex";
            data.secondname = "Best";
            data.contacts = "Kiev";
            data.work = [{
                job:  "intern Front-end",
                company:  "Grammarly",
                start:   new Date("12/6/14"),
                end:  new Date("2/29/14"),
                description: "study to make app"
            },{
                job:  "Front-end Dev",
                company:  "Grammarly",
                start:   new Date("2/29/14"),
                end:  new Date(),
                description: "make app"
            }];


            var url = "/api/edit-user";

            post(data, url, callback);
        },
        editCompany: function(){
            var data = {};

            data.city = "Kiev";
            data.contacts = "Cupertion";
            data.about = "The Best";

            var url = "/api/edit-company";

            post(data, url, callback);
        },
        removeUser: function(){
            var url = "/api/remove-user/54bd5c64f277b2e48bffdbbd"
            get(url, callback);
        },
        removeCompany: function(){
            var url = "/api/remove-company/54c01f02344272dc6e60b729"
            get(url, callback);
        },
        dropUser: function(){
            var url = "/api/drop-user";
            get(url, callback);
        },
        dropCompany: function(){
            var url = "/api/drop-company";
            get(url, callback);
        },
        createPost: function(){
            var data = {
                job: "JS Dev",
                city: "Kiev",
                about: "kiev",
                tags: "js front-end"
            }

            var url = "/api/create-post";
            post(data, url, callback);
        },
        editPost: function(){
            var data = {
                job: "june JS Dev",
                offer: "$500",
                tags: "js front-end angular",
                acting: "dev our app",
                openQuestion: [
                    {
                        correct: '2',
                        question: '1+1?',
                        isChecked: true
                    },
                    {
                        correct: '3',
                        question: '2+1?',
                        isChecked: true
                    }
                ],
                testQuestion: [
                    {
                        correct: '0',
                        question: '10+1?',
                        answers:['12','11','13','10']
                    },
                    {
                        correct: '3',
                        question: '2+2?',
                        answers:['1','2','3','4']
                    }
                ],
                users: [null],
                responders: [null]
            };

            var url = "/api/edit-post/54c2c5af7173980117dbf4ce";
            post(data, url, callback);
        },
        removePost: function(){
            var url = "/api/remove-post/54bbee94fbbfcdb97a90482a"
            get(url, callback);
        },
        dropPost: function(){
            var url = "/api/drop-post";
            get(url, callback);
        },
        getUsers: function(){
            var url = "/api/get-users";
            get(url, callback);
        },
        getCompanies: function(){
            var url = "/api/get-companies";
            get(url, callback);
        },
        getPosts: function(){
            var url = "/api/get-posts";
            get(url, callback);
        },
        subscribe: function(){
            var url = "/api/subscribe/54c2c5927173980117dbf4cd";
            get(url, callback);
        },
        getSubscribeUsers: function(){
            var url = "/api/get-subscribe-user/54c2c5927173980117dbf4cd"
            get(url, callback);
        },
        unsubscribe: function(){
            var url = "/api/unsubscribe/54c01f02344272dc6e60b729"
            get(url, callback);
        },
        subscribeCompanies: function(){
            var url = "/api/get-subscribe-companies"
            get(url, callback);
        },
        subscribePosts: function(){
            var url = "/api/get-subscribe-posts"
            get(url, callback);
        },
        dropDb: function(){
            var url = "/api/drop-db"
            get(url, callback);
        },
        getPost: function(){
            var url = "/api/post/54c2c5af7173980117dbf4ce";
            get(url, callback);
        },
        respondList: function(){
            var id = "54c2c5af7173980117dbf4ce";
            var url = "/api/respond-post-list/"+id;
            get(url, callback);
        },
        respondUser: function(){
            var data = {
                postId:  "54c2c5af7173980117dbf4ce",
                userId: "54c369efedc64782296d8d34"
            }
            var url = "/api/respond-post-user/";
            post(data, url, callback);
        },
        respond: function(){
            var id = "54c2c5af7173980117dbf4ce",
                url = "/api/respond-post/" + id,
                testQuestion = ["54c2a4e53ac40c6f0f46fdf6","54c2a4e53ac40c6f0f46fdf5"],
                openQuestion = ["54c2a4e53ac40c6f0f46fdf4","54c2a4e53ac40c6f0f46fdf3"],
                testAnswer = ["0","3"],
                openAnswer = ["2","3"],
                data = {
                    testQuestion: [],
                    openQuestion: []
                };

            for(var i = 0; i<testQuestion.length; i++)
                data.testQuestion.push({
                    id: testQuestion[i],
                    ans: testAnswer[i]
                });

            for(var i = 0; i<openQuestion.length; i++)
                data.openQuestion.push({
                    id: openQuestion[i],
                    ans: openAnswer[i]
                });

            post(data, url, callback);
        }
    }
}

function signupUser(){
    var api = new ClientApi();
    api.signUpUser();
}

function signupCompany(){
    var api = new ClientApi();
    api.signUpCompany();
}

function logout(){
    var api = new ClientApi();
    api.logout();
}

function signinUser(){
    var api = new ClientApi();
    api.signInUser();
}

function signinCompany(){
    var api = new ClientApi();
    api.signInCompany();
}

function infoUser(){
    var api = new ClientApi();
    api.getInfoUser();
}


function infoCompany(){
    var api = new ClientApi();
    api.getInfoCompany();
}

function getStatus(){
    var api = new ClientApi();
    api.getAuth();
}

function editUser(){
    var api = new ClientApi();
    api.editUser();
}

function editCompany(){
    var api = new ClientApi();
    api.editCompany();
}

function removeUser(){
    var api = new ClientApi();
    api.removeUser();
}

function removeCompany(){
    var api = new ClientApi();
    api.removeCompany();
}

function dropUser(){
    var api = new ClientApi();
    api.dropUser();
}

function dropCompany(){
    var api = new ClientApi();
    api.dropCompany();
}

function createPost(){
    var api = new ClientApi();
    api.createPost();
}

function editPost(){
    var api = new ClientApi();
    api.editPost();
}

function removePost(){
    var api = new ClientApi();
    api.removePost();
}

function dropPost(){
    var api = new ClientApi();
    api.dropPost();
}


function getUsers(){
    var api = new ClientApi();
    api.getUsers();
}

function getCompanies(){
    var api = new ClientApi();
    api.getCompanies();
}

function getPosts(){
    var api = new ClientApi();
    api.getPosts();
}

function subscribe(){
    var api = new ClientApi();
    api.subscribe();
}

function unsubscribe(){
    var api = new ClientApi();
    api.unsubscribe();
}

function subscribePosts(){
    var api = new ClientApi();
    api.subscribePosts();
}

function subscribeCompanies(){
    var api = new ClientApi();
    api.subscribeCompanies();
}

function changeMailUser(){
    var api = new ClientApi();
    api.changeMailUser();
}

function changePasswordUser(){
    var api = new ClientApi();
    api.changePasswordUser();
}

function changeMailCompany(){
    var api = new ClientApi();
    api.changeMailCompany();
}

function changePasswordCompany(){
    var api = new ClientApi();
    api.changePasswordCompany();
}

function getSubscribeUsers(){
    var api = new ClientApi();
    api.getSubscribeUsers();
}

function dropDb(){
    var api = new ClientApi();
    api.dropDb();
}

function getPostInf(){
    var api = new ClientApi();
    api.getPost();
}

function respond(){
    var api = new ClientApi();
    api.respond();
}

function respondList(){
    var api = new ClientApi();
    api.respondList();
}

function respondUser(){
    var api = new ClientApi();
    api.respondUser();
}