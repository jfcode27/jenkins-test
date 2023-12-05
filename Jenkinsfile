pipeline {
    agent any

    stages {
        stage('Notificar en Slack') {
            steps {
                // script {
                //   switch(env.githubEvent) {
                //     case 'push':
                //         slackSend (color: '#FFFF00', message: "Se ha realizado un push en el repositorio ${env.gitlabUserName} por ${env.gitlabSourceName} en la rama ${env.gitlabSourceBranch} con el commit ${env.gitlabSourceBranch}")
                //         echo "Se ha realizado un push en el repositorio ${env.gitlabSourceRepoName} por ${env.gitlabUserName} en la rama ${env.gitlabSourceBranch} con el commit ${env.gitlabSourceBranch}"
                //         echo env.githubEvent
                //     break
                //   }
                // }
                echo "GitHub Event: ${env.GIT_COMMIT}"
            }
        }
    }
}