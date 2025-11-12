pipeline {
    agent any

    stages {
        // Para parar todo el proyecto y los servicios
        stage('Parando los servicios') {
            steps {
                bat '''
                    docker compose -p sgu-dmga-10c down || exit 0
                '''
            }
        }
        
        // Para eliminar las imágenes
        stage('Eliminando imágenes anteriores') {
            steps {
                bat '''
                    docker images --format "{{.Repository}}:{{.Tag}}" | findstr /C:"sgu" > temp_images.txt
                    if exist temp_images.txt (
                        for /f "delims=" %%i in (temp_images.txt) do (
                            docker rmi -f %%i 2>nul || echo Imagen %%i no encontrada
                        )
                        del temp_images.txt
                    )
                    echo Limpieza de imagenes completada
                '''
            }
        }

        // Para bajar actualizaciones
        stage('Actualizando') {
            steps {
                checkout scm
            }
        }
        
        // Para levantar y desplegar proyecto
        stage('Construyendo y desplegando servicios') {
            steps {
                bat '''
                    docker compose -p sgu-dmga-10c up --build -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado con éxito'
        }

        failure {
            echo 'Hubo un error al ejecutar el pipeline'
        }

        always {
            echo 'Pipeline finalizado'
        }
    }
}