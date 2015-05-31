var userControllers = angular.module('userControllers', []);

userControllers.controller('UserCtrl',['$scope', '$http', 'AuthService',
    function($scope, $http, AuthService){

        $scope.getDate = function (date) {
            return (new Date(date)).toLocaleDateString()
        };

        $scope.getResume = function (user) {
            console.log(user);
            var docDefinition = {
                content: [
                    {text: user.firstname + ' ' + user.secondname, fontSize: 22},
                    {text: user.position+'\n\n', fontSize: 18},
                    {
                        image: user.img,
                        width: 150,
                        height: 150
                    },
                    {text: '\n\nДата Народження: ' + $scope.getDate(user.dob)+'\n', fontSize: 10},
                    {text: 'Місто: ' + user.city+'\n', fontSize: 10},
                    {text: 'Телефон: ' + user.tel+'\n', fontSize: 10},
                    {text: 'Email: ' + user.mail+'\n\n', fontSize: 10},
                    {text: '\nПро cебе\n\n', fontSize: 16},
                    {text: user.about, fontSize: 12},
                    {text: '\nНавички\n', fontSize: 16},
                    {text: user.skills, fontSize: 12}
                ]
            };

            if (user.work.length) {
                docDefinition.content.push({text: '\nДосвід роботи\n\n', fontSize: 16});
                user.work.forEach(function(item) {
                    docDefinition.content.push({text: item.job + '\n', fontSize: 14});
                    docDefinition.content.push({text: item.company + '\t – \t' + $scope.getDate(item.start) + '-' + $scope.getDate(item.end) + '\n\n', fontSize: 12});
                    docDefinition.content.push({text: item.description + '\n\n', fontSize: 12});
                })
            }

            if (user.study.length) {
                docDefinition.content.push({text: '\nОсвіта\n\n', fontSize: 16});
                user.study.forEach(function(item) {
                    docDefinition.content.push({text: item.university + '\n', fontSize: 14});
                    docDefinition.content.push({text: item.degree + '\t – \t' + $scope.getDate(item.start) + '-' + $scope.getDate(item.end) + '\n\n', fontSize: 12});
                    docDefinition.content.push({text: item.direction + '\n\n', fontSize: 12});
                })
            }


            pdfMake.createPdf(docDefinition).download('resume.pdf');
        }

        $scope.getDateFormat = function (date) {
            var newDate = new Date(date);
            return strDate(newDate);
        };

        function strDate(date){
            var isCurMonth = date.getUTCFullYear() == (new Date()).getUTCFullYear()
                    && date.getUTCMonth() == (new Date()).getUTCMonth()
                , isCurDay = date.getDate() == (new Date).getDate()
                , isYesterday = date.getDate() == (new Date).getDate() - 1;

            if (!isCurMonth) return date.toLocaleDateString();
            if (isCurDay) return 'Cьогодні '+ date.toLocaleTimeString();
            if (isYesterday) return 'Вчора '+date.toLocaleTimeString();
            return date.toLocaleDateString();
        }
    }]);