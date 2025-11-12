pipeline{
    agent any

    stages{
        //Para parar todo el poryecto y los servicios
        stage('Parando los servicios'){
            steps{
                bat'''
                docker compose -p sgu-dmga-10c down || true 
                '''
            }
        }//para eliminar las imagenes
        stage('Eliminando imágenes anteriores...') {
            steps {
                bat '''
                    for /f "tokens=*" %%i in ('docker images --filter "label=com.docker.compose.project=sgu-dmga-10c" -q') do (
                        docker rmi -f %%i
                    )
                    if errorlevel 1 (
                        echo No hay imagenes por eliminar
                    ) else (
                        echo Imagenes eliminadas correctamente
                    )
                '''
            }
        }


//para bajar actualizaciones
        stage('Actualizando...'){
            steps{
                checkout scm
            }
        }
        //para levantar y desplegar proyecto
        stage('Construyendo y desplegando servicios...') {
            steps {
                bat '''
                    docker compose up --build -d
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