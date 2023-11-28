pipeline {
    agent any

    stages {
        stage('Notificar en Slack') {
            steps {
                script {
                    if (env.CHANGE_AUTHOR == 'your-github-username') {
                        echo 'This is a push from your-github-username'
                    } else if (env.CHANGE_ID) {
                        echo 'This is a pull request'
                    } else {
                        echo 'This is a generic GitHub event'
                    }
                }
            }
        }
    }
}