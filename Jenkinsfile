pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Checkout') {
        steps {
            git branch: 'main', credentialsId: 'ssh-tarot', url: 'git@github.com:ArturTonoyan/tarotCourse.git'
        }
    }
    stage('Build Front') {
      steps {
        dir('web'){
            sh 'npm i'
            sh 'CI=false npm run build'
        }
      }
    }
    stage('Build Back') {
      steps {
        dir('api'){
            sh 'npm i'
            sh 'CI=false npm run build'
        }
      }
    }
    stage('Deploy Front') {
      steps {
        dir('web'){
            sh 'sudo rm -r /var/www/*'
            sh 'sudo mv build /var/www/'
        }
      }
    }
    stage('Notification'){
        steps {
            notifyEvents message: 'Билд завершен успешно! Build id:<b>$BUILD_ID</b>', token: '$NOTIFY_BOT'
        }
    }
  }
}