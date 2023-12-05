pipeline {
    agent any

    stages {
        stage('Imprimir Mensajes según el Evento') {
            steps {
                script {
                    // Verificar si es un evento de pull request
                    if (env.CHANGE_ID) {
                        echo 'Este fue un evento de pull request'
                        // Agregar más lógica específica de pull request aquí si es necesario
                    }
                    
                    // Verificar si es un evento de push
                    if (env.CHANGE_BRANCH) {
                        echo 'Este fue un evento de push a la rama ' + env.CHANGE_BRANCH
                        // Agregar más lógica específica de push aquí si es necesario
                    }

                    // Verificar si es un evento de comentario
                    if (env.COMMENT) {
                        echo 'Se realizó un comentario en el cambio'
                        // Agregar más lógica específica de comentario aquí si es necesario
                    }
                }
            }
        }

        // Otras etapas de tu construcción
    }
}
//json