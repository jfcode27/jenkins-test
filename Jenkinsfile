pipeline {
    agent any

    environment {
        CHANGE_URL = "${env.CHANGE_URL}"
    }

    stages {
        stage('Determinar Tipo de Evento') {
            steps {
                script {
                    def payload = sh(script: "curl -sSL $CHANGE_URL", returnStdout: true).trim()

                    if (payload.contains('pull_request')) {
                        echo 'Este fue un evento de pull request'
                    } else if (payload.contains('push')) {
                        echo 'Este fue un evento de push directo a la rama'
                    } else {
                        echo 'Tipo de evento no reconocido'
                    }
                }
            }
        }

        stage('Otras Etapas de Construcción') {
            steps {
                // Resto de tu lógica de construcción
            }
        }
    }
}
